function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error('Invalid JSON input.');
  }
}

module.exports = { parseJSON };
