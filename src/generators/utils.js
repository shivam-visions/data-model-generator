function isValidJSON(input) {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  }
  
  module.exports = { isValidJSON };
  