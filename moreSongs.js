import puppeteer from 'puppeteer-core';
import { appendData, getPlatform } from './utils/index.js';

export default async function moreSongs() {
  try {
    // set some options (set headless to false so we can see this automated browsing experience)
    let launchOptions = {
      headless: false,
      executablePath:
        getPlatform(), // because we are using puppeteer-core so we must define this option
      args: ['--start-maximized'],
    };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({ width: 1200, height: 80000 }); // [NOTE] set large height so all tracks can are visible in the viewport
    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    );

    // Go to the chillHop Albums Page
    await page.goto('https://chillhop.com/releases/', {
      timeout: 20000,
      waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    });
    const albumLinks = await page.$$eval('.release > a', (list) =>
      list.map((elm) => elm.href)
    ); // 12 Albums Load Initaially

    /*
     *  Create a new variable newAlbums, which will be a trimmed version of albumLinks variable 
     *  Remove the num of albums already visited (global var), from the top from the albumLinks and store it in the newAlbums var 
     *  Now do the same thing for the newAlbum links
     *  Also have to propt the user with the num of albums extracted and if he wanna extract more of them.
     */

    
    console.log(albumLinks);
    


    await page.setRequestInterception(true); // [NOTE] Listen for network requests
    page.on('request', (request) => {
      request.continue();
    }); // [NOTE] allow requests to go through. As a performance boost you can abort requesrs for images

    for (let i = 0; i < albumLinks.length; i++) {
      const albumURL = albumLinks[i];
      await page.goto(albumURL);

      try {

        const album = await page.$$('.single-container .track-single');
        console.log("Number of Songs:", album.length);

        if (album.length >= 5) {  // Scrape Data only if the tracks are more than 5
          let albumName = await page.$eval(
            'div.title-holder h1',
            (name) => name.textContent
          );
          let albumArtist = await page.$eval(
            'div.title-holder h2',
            (name) => name.textContent
          );
          let [imgSrc, imgAlt] = await page.$eval(
            '.col-md-6.col-sm-4.fa img', // # this is flaky, possibilty the site is responsive and will cause it to fail. Find another selector
            (img) => [img?.getAttribute('src'), img?.getAttribute('alt')]
          );

          const tracks = [];
          const regex = /mp3/g;

          for (const track of album) {
            try {
              const anchor = await track.$('a'); // retrieve the first anchor tag thats a child of current .track-single
              const request = page.waitForRequest((request) => regex.test(request.url()), { timeout: 5000 }); // return requests that contain mp3 in its url

              await anchor.click(); // click anchor tag to begin playback moreso trigger request for track
              console.log('Song Clicked');
              const req = await request; // wait for appropriate request to be made
              const trackMetaData = await track.evaluate((element) => {
                /**
                 * Gather all track metadata from browser context.
                 * Anything logged here will appear in your spawn brower
                 */
                return {
                  'track-id': element.getAttribute('data-track_id'),
                  title: element.querySelector('.trackTitle').innerText,
                  artists: element.querySelector('.trackArtists a').innerText,
                  duration: element.querySelector('.track-length').innerText,
                };
              });

              const url = req.url();
              console.log({ trackMetaData, url }, '------>>>>>');

              tracks.push({
                ...trackMetaData,
                'audio-src': url,
              });
            } catch (error) { // catch TimeoutError
              console.log('[ERROR]', error);
              continue; //  Should continue looping through the tracks even if I get the Timeout exceeded error
            }
          }

          let albumData = {
            name: albumName,
            artist: albumArtist,
            url: albumURL,
            'img-src': imgSrc,
            'img-alt': imgAlt,
            tracks,
          };

          console.log(
            { albumData: JSON.stringify(albumData, null, 2) },
            '<--------'
          ); // User readable object in terminal

          appendData(albumData);
        }
      } catch (error) {
        // * If Something Goes Wrong
        console.log('[ERROR] ', error);
        continue;
      }
      console.log('Reached the end');
    }

    // Close the browser
    await browser.close();

  } catch (error) {
    console.log(error);
  }
}
