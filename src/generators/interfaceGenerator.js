function generateInterface(interfaceName, data, mappings = {}) {
  const lines = [`interface ${interfaceName} {`];
  const generatedInterfaces = {}; // Store generated interfaces to avoid duplicates

  // Helper function to capitalize interface names
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Helper function to infer the type of a value
  function inferType(value, mappings) {
    if (Array.isArray(value)) {
      return 'any'; // Arrays will be handled separately
    }
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (value === null) return 'null';
    if (typeof value === 'object') return 'object'; // This will be handled as a nested interface
    return 'any';
  }

  // Function to generate interfaces for objects (recursively)
  function generateNestedInterface(key, value) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      const nestedInterfaceName = capitalize(key);
      if (!generatedInterfaces[nestedInterfaceName]) {
        generatedInterfaces[nestedInterfaceName] = generateInterface(nestedInterfaceName, value, mappings);
      }
      return nestedInterfaceName; // Reference the nested interface
    }
    return inferType(value, mappings); // Return inferred type if it's not an object
  }

  // Loop through all the keys in the data object
  for (const key in data) {
    const value = data[key];

    if (Array.isArray(value)) {
      // Handle arrays: if array contains objects, create a new interface for the object type
      if (value.length > 0 && typeof value[0] === 'object') {
        const nestedInterfaceName = capitalize(key);
        if (!generatedInterfaces[nestedInterfaceName]) {
          generatedInterfaces[nestedInterfaceName] = generateInterface(nestedInterfaceName, value[0], mappings);
        }
        lines.push(`  ${key}: ${nestedInterfaceName}[];`); // Reference the array of objects interface
      } else {
        lines.push(`  ${key}: ${inferType(value[0], mappings)}[];`); // Handle array of primitives
      }
    } else if (typeof value === 'object') {
      // Handle nested objects: create interface and reference it
      const nestedInterfaceName = generateNestedInterface(key, value);
      lines.push(`  ${key}: ${nestedInterfaceName};`);
    } else {
      // Handle primitive types (string, number, etc.)
      lines.push(`  ${key}: ${inferType(value, mappings)};`);
    }
  }

  lines.push('}');
  const interfaceDefinition = lines.join('\n');

  // Join all generated interfaces together
  let finalOutput = interfaceDefinition + '\n\n';
  for (const [interfaceName, interfaceDefinition] of Object.entries(generatedInterfaces)) {
    finalOutput += interfaceDefinition + '\n\n';
  }

  return finalOutput;
}
  
module.exports = { generateInterface };
  