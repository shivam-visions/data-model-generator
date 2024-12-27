const xml2js = require('xml2js');

async function parseXML(xmlString) {
  const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });

  const result = await parser.parseStringPromise(xmlString);

  // Convert repeating elements into arrays
  function normalizeArrays(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    const keys = Object.keys(obj);
    for (const key of keys) {
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map(normalizeArrays); // Recurse into arrays
      } else if (typeof obj[key] === 'object') {
        obj[key] = normalizeArrays(obj[key]); // Recurse into objects
      }
    }
  
    // Handle cases where repeated elements are not arrays
    for (const key of keys) {
      if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        const childKeys = Object.keys(obj[key]);
        const isArrayLike = childKeys.every((k, i) => k === String(i));
        if (isArrayLike) {
          obj[key] = Object.values(obj[key]).map(normalizeArrays); // Convert to array
        }
      }
    }
  
    return obj;
  }

  return normalizeArrays(result);
}

module.exports = { parseXML };
