import scrape from './scrape.js';
import moreSongs from './moreSongs.js';
import { createFile, endFile } from './utils/index.js';

global.a = "This is a global var"

console.log(global.a);

createFile();

// await scrape();
// await moreSongs()

endFile();