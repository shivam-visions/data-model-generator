const axios = require('axios');

async function parseAPI(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch API response.');
  }
}

module.exports = { parseAPI };
