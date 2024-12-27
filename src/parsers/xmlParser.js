const xml2js = require('xml2js');

async function parseXML(xmlString) {
  try {
    const result = await xml2js.parseStringPromise(xmlString);
    return result;
  } catch (err) {
    throw new Error('Invalid XML input.');
  }
}

module.exports = { parseXML };
