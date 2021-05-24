import scrape from './scrape.js';
import moreSongs from './moreSongs.js';
import { createFile, endFile, updateDatabase } from './utils/index.js';
import yesno from 'yesno';

// createFile();

// await scrape();
// ! await moreSongs()

// endFile();

// * Append Data to Database
const appendToDB = await yesno({
  question: 'Push Data to Database?'
});
appendToDB && updateDatabase();
