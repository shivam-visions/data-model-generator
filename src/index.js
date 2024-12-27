const { parseJSON } = require('./parsers/jsonParser');
const { parseXML } = require('./parsers/xmlParser');
const { parseYAML } = require('./parsers/yamlParser');
const { parseAPI } = require('./parsers/apiParser');
const { parseProtobuf } = require('./parsers/protobufParser');
const { parseCSV } = require('./parsers/csvParser');
const { generateInterface } = require('./generators/interfaceGenerator');

async function generateModelFromSource(source, type, options = {}) {
  const { interfaceName = 'Root', customMappings = {} } = options;
  let data;

  switch (type.toLowerCase()) {
    case 'json':
      data = parseJSON(source);
      break;
    case 'xml':
      data = await parseXML(source);
      break;
    case 'yaml':
      data = parseYAML(source);
      break;
    case 'api':
      data = await parseAPI(source);
      break;
    case 'protobuf':
      data = await parseProtobuf(source);
      break;
    case 'csv':
      data = await parseCSV(source);
      break;
    default:
      throw new Error('Unsupported source type.');
  }

  if (Array.isArray(data)) {
    const firstElement = data[0];
    if (typeof firstElement === 'object' && firstElement !== null) {
      return generateInterface(interfaceName, firstElement, customMappings);
    } else {
      throw new Error('Array elements must be objects to generate an interface.');
    }
  } else if (typeof data === 'object' && data !== null) {
    return generateInterface(interfaceName, data, customMappings);
  } else {
    throw new Error('Input data must be an object or an array of objects.');
  }
}


module.exports = { generateModelFromSource };
