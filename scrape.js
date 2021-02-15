
import puppeteer from 'puppeteer-core';
import appendData from './appendData.js';

export async function scrape() {
    try {
      // set some options (set headless to false so we can see this automated browsing experience)
      let launchOptions = {
        headless: true,
        executablePath:
          'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', // because we are using puppeteer-core so we must define this option
        args: ['--start-maximized'],
      };

      const browser = await puppeteer.launch(launchOptions);
      const page = await browser.newPage();

      // set viewport and user agent (just in case for nice viewing)
      await page.setViewport({ width: 1366, height: 768 });
      await page.setUserAgent(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
      );

      // Go to the chillHop Albums Page
      await page.goto('https://chillhop.com/releases/');
      const albumLinks = await page.$$eval('.release > a', (list) =>
        list.map((elm) => elm.href)
      ); // 12 Albums Load Initaially

      // console.log(albumLinks);

      for (const [index, albumURL] of albumLinks.entries()) {
        // console.log(albumURL);
        await page.goto(albumURL);

        try {

          await page.waitForTimeout(2000) // * MAGIC

          const numOfTracks = await page.$$eval('.track-single',
            (tracks) => tracks.length
          );

          if (numOfTracks >= 5) {
            let albumName = await page.$eval('div.title-holder h1', (name) => name.textContent);
            let albumArtist = await page.$eval('div.title-holder h2', (name) => name.textContent);
            let [imgSrc, imgAlt] = await page.$eval('.col-md-6.col-sm-4.fa img', (img) => [img.getAttribute('src'), img.getAttribute('alt')]);
            // let audioSrc = await page.$eval('audio#jp_audio_0', (audio) => audio.childNodes
            // let releaseDate = await page.$$eval('span.date', date => [...date])
            // console.log(albumName, albumArtist, imgSrc, imgAlt);
            let trackData = await page.$$eval('.track-single', (tracks) => {
              // if (tracks.length >= 5) {
              return tracks.map((track) => {
                
                track.querySelector(`a.track-${track.children[0].getAttribute('data-track')}`).click(); // ? Not sure if this works

                return {
                  'data-track': track.children[0].getAttribute('data-track'),
                  title: track.querySelector('div.trackTitle').textContent,
                  artists: track.querySelectorAll('div.trackArtists')[0].textContent,
                  duration: track.querySelector('div.track-length').textContent,
                  "audio-src": document.querySelector('audio').getAttribute('src')  // ! returns noting
                };
              });
            });
            // console.log(trackData);

            let albumData = {
              "name": albumName,
              "artist": albumArtist,
              "url": albumURL,
              "img-src": imgSrc,
              "img-alt": imgAlt,
              "tracks": trackData
            }
            // console.log(albumData);
            // albumData += ","; // JSON Formatting
            console.log(index);
            console.log(albumLinks.length);

            if ((index + 1) === albumLinks.length) {  // Last Album
              appendData(albumData, true)
            } else {
              appendData(albumData, false)
            }


          }
        } catch (error) { // * If Something Goes Wrong
          console.log(error);
          continue;
        }
        // formatData(albumData)
      }

      // close the browser
      await browser.close();
    } catch (error) {
      console.log(error);
    }
  
}
