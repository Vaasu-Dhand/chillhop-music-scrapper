const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let somethingElse = document.querySelectorAll('.track-single');

// function trackData() {
let anotherOne = somethingElse.forEach(async (track, index) => {
  let songLoadPromise = new Promise((resolve, reject) => {
    setTimeout(async function () {
      track
        .querySelector(
          `a.track-${track.children[0]?.getAttribute('data-track')}`
        )
        .click(); // ! Causes the error when executed quickly
      console.log('Song Clicked');

      await sleep(3000);
      console.log('Src extracted');
      resolve(document.querySelector('audio')?.getAttribute('src'));
    }, index * 6000);
  });
  let data = await songLoadPromise;
  console.log(data);

  // return {
  //   "data": data
  // }

  // let elementRef = document.querySelector('div#player-controlls').classList
});

console.log(anotherOne);

// trackData()
