import readline from 'readline';
import global from './globals.js';

export default function fetchMoreAlbumData() {

  // * Print Info
  console.log('<--------------------------------->');
  console.log(`Iteration ${global.iteration} Complete!\nAlbums Data Saved: ${global.albumsExtracted}`);
  console.log('<--------------------------------->');

  // * Ask the user if he wants to fetch more songs
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let shouldFetchMoreData = rl.question('Fetch More Albums? ', (answer) => {
    console.log(`Your Answer: ${answer}`);
    if (answer === "Y" || answer === "y" || answer === "Yes" || answer === "yes") {
      console.log("Execution Continues");
      rl.close();
      return true
    } else if (answer === "N" || answer === "n" || answer === "No" || answer === "no") {
      console.log("Execution Stopped");
      rl.close();
      return false
    } else {
      rl.close();
      return false
    }
    
  });

  return shouldFetchMoreData
};
