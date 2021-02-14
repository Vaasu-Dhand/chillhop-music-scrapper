import fs from 'fs';
import { scrape } from './scrape.js';

const schema = {
  "albums": [] 
}

// Create a data.json file
fs.writeFile('./data.json', JSON.stringify(schema), (err) => {
  if (err) console.error(err)
  // console.log('data.json created');
});

scrape()
