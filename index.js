import fs from 'fs';
import jsonfile from 'jsonfile';
import { scrape } from './scrape.js';
import getSrc from './getSrc.js'

const schema = '{"albums": [ ';

// Create a data.json file
  fs.writeFile('./data.json', (schema), (err) => {
    if (err) console.error(err)
    console.log("File Created");
  })
  
 await scrape()
  
  fs.appendFileSync('./data.json', ' ] } ', (err) => {
    if (err) console.error(err);
    console.log('Write Completed');
  });
