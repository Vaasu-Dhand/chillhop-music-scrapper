import fs from 'fs';
import jsonfile from 'jsonfile';
import { scrape } from './scrape.js';
import getSrc from './getSrc.js'

const schema = '{"albums": [ ';

// Create a data.json file
async function init() {
  fs.writeFile('./data.json', (schema), (err) => {
    console.log(schema);
    if (err) console.error(err)
    // console.log('data.json created');
  })
  
  await scrape()
  
  fs.appendFileSync('./data.json', ' ] } ', (err) => {
    if (err) console.error(err);
    console.log('Write Completed');
  });

  jsonfile.writeFileSync('data.json', ' ] } ', { flag: 'a' })

}

init()


// getSrc()