const { parseJSON } = require('./parsers/jsonParser');
const { parseXML } = require('./parsers/xmlParser');
const { parseAPI } = require('./parsers/apiParser');

const { generateInterface } = require('./generators/interfaceGenerator');

async function generateModelFromSource(source, type, options = {}) {
  const { interfaceName = 'Root', customMappings = {}, outputPath = '', fileName = 'GeneratedInterface.ts' } = options;
  let data;

  switch (type.toLowerCase()) {
    case 'json':
      data = parseJSON(source);
      break;
    case 'xml':
      data = await parseXML(source);
      break;
    case 'api':
      data = await parseAPI(source);
      break;
    default:
      throw new Error('Unsupported source type.');
  }

  let interfaceCode;
  if (Array.isArray(data)) {
    const firstElement = data[0];
    if (typeof firstElement === 'object' && firstElement !== null) {
      interfaceCode = generateInterface(interfaceName, firstElement, customMappings);
    } else {
      throw new Error('Array elements must be objects to generate an interface.');
    }
  } else if (typeof data === 'object' && data !== null) {
    interfaceCode = generateInterface(interfaceName, data, customMappings);
  } else {
    throw new Error('Input data must be an object or an array of objects.');
  }

  if (typeof window !== 'undefined') {
    const blob = new Blob([interfaceCode], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`Interface file ${fileName} has been downloaded.`);
    return;
  }

  if (outputPath) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(outputPath, fileName);
    fs.writeFileSync(filePath, interfaceCode, 'utf8');
    console.log(`Interface file saved to: ${filePath}`);
    return;
  }

  return interfaceCode;
}


module.exports = { generateModelFromSource };
