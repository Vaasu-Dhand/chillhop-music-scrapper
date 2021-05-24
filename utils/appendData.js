import fs from 'fs';
import jsonfile from 'jsonfile';

export default function appendData(data, isLast = false) {
  try {
  
    if (data) {
      console.log(data);
      jsonfile.writeFileSync('./data/data.json', data, { flag: 'a' });
      console.log('Album Data Saved');
    }
    
    !isLast && fs.appendFileSync('./data/data.json', ',');
  } catch (error) {
    if (error) console.log(error);
  }
};
