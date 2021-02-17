const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let somethingElse = document.querySelectorAll('.track-single');

let trackData = async () => {
// let anotherOne = 
  return Array.from(somethingElse).map(async (track, index) => {
  let songLoadPromise = new Promise((resolve, reject) => {
    setTimeout(async function () {
      track
        .querySelector(
          `a.track-${track.children[0]?.getAttribute('data-track')}`
        )
        .click(); // ! Causes the error when executed quickly
      console.log('Song Clicked');

      await sleep(2000);  // * Prevent the Above error
      console.log('Src extracted');
      resolve(document.querySelector('audio')?.getAttribute('src'));
    }, index * 5000);
  });
  let songSrc = await songLoadPromise;
  console.log(songSrc);

  songLoadPromise.then(() => {
    return {
      "src": songSrc
    }
  })

  return (
    songLoadPromise.then(() => {
      return {
        "src": songSrc
      }
    })
  )

});


}
// console.log(anotherOne);

let data = await trackData()  // return undefined immediately
console.log("Data", trackData());

trackData().then((data) => {
  console.log(data);
}).catch((err) => {
  console.log("Error", err)
})

Promise.all([trackData()]).then(values => console.warn(values))
