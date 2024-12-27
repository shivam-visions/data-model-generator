const csv = require('csv-parser');
const fs = require('fs');

function parseCSV(csvFilePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', () => resolve(rows))
      .on('error', (err) => reject(err));
  });
}

module.exports = { parseCSV };
