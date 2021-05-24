import trim from 'trim-whitespace'
import fs from 'fs'

// Remove the last character (comma)
let rawData = fs.readFileSync('./data/data.json')
// let formattedData = rawData.toString().slice(0, -1)
// formattedData += ' ] } ';

// console.log(trim(rawData.toString()));

// Write File
fs.writeFileSync('./data/data.json', JSON.stringify(JSON.parse(rawData.toString())), (err) => {
  if (err) console.error(err);
  console.log('Write Completed');
});