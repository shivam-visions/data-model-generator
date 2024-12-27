function generateInterface(obj, interfaceName = 'Root', customMappings = {}) {
    const lines = [`interface ${interfaceName} {`];
  
    for (const [key, value] of Object.entries(obj)) {
      const type = customMappings[key] || getType(value);
      lines.push(`  ${key}: ${type};`);
    }
  
    lines.push('}');
    return lines.join('\n');
  }
  
  function getType(value) {
    if (Array.isArray(value)) {
      const arrayType = value.length ? getType(value[0]) : 'any';
      return `${arrayType}[]`;
    }
    if (value === null) return 'null';
    return typeof value === 'object' ? 'any' : typeof value;
  }
  
  module.exports = { generateInterface };
  