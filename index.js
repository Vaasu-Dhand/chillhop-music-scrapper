import scrape from './scrape.js';
import moreSongs from './moreSongs.js';
import { createFile, endFile } from './utils/index.js';

createFile();

await scrape();

endFile();