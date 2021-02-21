import fs from 'fs'

export default function endFile() {

  // Remove the last character (comma)
  let rawData = fs.readFileSync('./data/data.json')
  let formattedData = rawData.toString().slice(0, -1)
  formattedData += ' ] } ';

  // Write File
  fs.writeFileSync('./data/data.json', formattedData, (err) => {
    if (err) console.error(err);
    console.log('Write Completed');
  });
};
