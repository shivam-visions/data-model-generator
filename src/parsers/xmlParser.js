const xml2js = require('xml2js');

async function parseXML(xmlString) {
  const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });

  const result = await parser.parseStringPromise(xmlString);

  function normalizeArrays(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    const keys = Object.keys(obj);
    for (const key of keys) {
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map(normalizeArrays);
      } else if (typeof obj[key] === 'object') {
        obj[key] = normalizeArrays(obj[key]);
      }
    }

    for (const key of keys) {
      if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        const childKeys = Object.keys(obj[key]);
        const isArrayLike = childKeys.every((k, i) => k === String(i));
        if (isArrayLike) {
          obj[key] = Object.values(obj[key]).map(normalizeArrays);
        }
      }
    }
  
    return obj;
  }

  return normalizeArrays(result);
}

module.exports = { parseXML };
