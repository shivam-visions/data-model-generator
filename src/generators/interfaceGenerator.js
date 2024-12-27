function generateInterface(interfaceName, data, mappings = {}) {
  const lines = [`interface ${interfaceName} {`];
  const generatedInterfaces = {};

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function inferType(value, mappings) {
    if (Array.isArray(value)) {
      return 'any';
    }
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (value === null) return 'null';
    if (typeof value === 'object') return 'object';
    return 'any';
  }

  function generateNestedInterface(key, value) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      const nestedInterfaceName = capitalize(key);
      if (!generatedInterfaces[nestedInterfaceName]) {
        generatedInterfaces[nestedInterfaceName] = generateInterface(nestedInterfaceName, value, mappings);
      }
      return nestedInterfaceName;
    }
    return inferType(value, mappings);
  }

  for (const key in data) {
    const value = data[key];

    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        const nestedInterfaceName = capitalize(key);
        if (!generatedInterfaces[nestedInterfaceName]) {
          generatedInterfaces[nestedInterfaceName] = generateInterface(nestedInterfaceName, value[0], mappings);
        }
        lines.push(`  ${key}: ${nestedInterfaceName}[];`);
      } else {
        lines.push(`  ${key}: ${inferType(value[0], mappings)}[];`);
      }
    } else if (typeof value === 'object') {
      const nestedInterfaceName = generateNestedInterface(key, value);
      lines.push(`  ${key}: ${nestedInterfaceName};`);
    } else {
      lines.push(`  ${key}: ${inferType(value, mappings)};`);
    }
  }

  lines.push('}');
  const interfaceDefinition = lines.join('\n');

  let finalOutput = interfaceDefinition + '\n\n';
  for (const [interfaceName, interfaceDefinition] of Object.entries(generatedInterfaces)) {
    finalOutput += interfaceDefinition + '\n\n';
  }

  return finalOutput;
}
  
module.exports = { generateInterface };
  