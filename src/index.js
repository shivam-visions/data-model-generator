const { parseJSON } = require('./parsers/jsonParser');
const { parseXML } = require('./parsers/xmlParser');
const { parseYAML } = require('./parsers/yamlParser');
const { parseAPI } = require('./parsers/apiParser');
const { generateInterface } = require('./generators/interfaceGenerator');
const { parseProtobuf } = require('./parsers/protobufParser');
const { parseCSV } = require('./parsers/csvParser');

async function generateModelFromSource(source, type, options = {}) {
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

  return generateInterface(data, options.interfaceName || 'Root');
}

module.exports = { generateModelFromSource };
