
import puppeteer from 'puppeteer-core';
import appendData from './appendData.js';

export async function getSrc() {
    try {
      // set some options (set headless to false so we can see this automated browsing experience)
      let launchOptions = {
        headless: false,
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

      // for (const [index, albumURL] of albumLinks.entries()) {
        // albumLinks.forEach(async (albumURL, index) => {
          for (let i = 0; i < albumLinks.length; i++) {
            const albumURL = albumLinks[i];
            
          // }
        
          await page.goto(albumURL);
       
        // console.log(albumURL);

        try {
          await page.waitForTimeout(2000) // * MAGIC

          await page.$$eval('.list', listElement => listElement[1].remove());

          let numOfTracks = await page.$$eval('.track-single',
            (tracks) => tracks.length
          );
          // [SOLVED] The number of tracks come out to be 25 more than the actual number of tracks for some reason
          // console.log(numOfTracks);

          // Hold for a bit
          // await page.waitForTimeout(50000)

          if (numOfTracks >= 5) {
            let albumName = await page.$eval('div.title-holder h1', (name) => name.textContent);
            let albumArtist = await page.$eval('div.title-holder h2', (name) => name.textContent);
            let [imgSrc, imgAlt] = await page.$eval('.col-md-6.col-sm-4.fa img', (img) => [img?.getAttribute('src'), img?.getAttribute('alt')]);
            // let audioSrc = await page.$eval('audio#jp_audio_0', (audio) => audio.childNodes
            // let releaseDate = await page.$$eval('span.date', date => [...date])
            // console.log(albumName, albumArtist, imgSrc, imgAlt);
            
            let trackData = await page.$$eval('.track-single', (tracks) => {
              
              
              
              return tracks.map(async (track, index) => {  

                
                // track.querySelector(`a.track-${track.children[0]?.getAttribute('data-track')}`).click();   // Check if this is working properly
                
                let songLoadPromise = new Promise((resolve, reject) => {
                  setTimeout(async function () {
                      console.log(window);
                      track.querySelector(`a.track-${track.children[0]?.getAttribute('data-track')}`).click()
                      console.log('Song Clicked');
                      console.log(document.querySelector('audio')?.getAttribute('src'));
                      // await sleep(3000)
                      console.log("Src extracted");
                      resolve(document.querySelector('audio')?.getAttribute('src'))
                    }, index * 6000);
                });
                let songSrc = await songLoadPromise
                console.log(songSrc)

                  // return {
                  //   'data-track': track.children[0]?.getAttribute('data-track'),
                  //   title: track.querySelector('div.trackTitle').textContent,
                  //   artists: track.querySelectorAll('div.trackArtists')[0].textContent,
                  //   duration: track.querySelector('div.track-length').textContent,
                  //   "audio-src": songSrc || "couldNotFetch" 
                  // };
                  
              });
            });
            await trackData

            let albumData = {
              "name": albumName,
              "artist": albumArtist,
              "url": albumURL,
              "img-src": imgSrc,
              "img-alt": imgAlt,
              "tracks": trackData
            }

            if ((i + 1) === albumLinks.length) {  // Last Album
              appendData(albumData, true)
            } else {
              appendData(albumData, false)
            }
          }
        } catch (error) { // * If Something Goes Wrong
          console.log(error);
          // continue;
        }
        // formatData(albumData)
      }
    // });

      // close the browser
      await browser.close();
    } catch (error) {
      console.log(error);
    }
  
}
