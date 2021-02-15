import fs from 'fs';
import jsonfile from 'jsonfile';

export default (data, isLast) => {
  try {
    // console.log();

    jsonfile.writeFileSync('data.json', data, { flag: 'a' });

    console.log('Album Data Saved');

    !isLast && fs.appendFileSync('./data.json', ',');

  } catch (error) {
    if (error) console.log(error);
  }
};
