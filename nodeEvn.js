let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let array = [1, 2, 3, 4, 5];

let arrayMap = array.map(async (value, i) => {
  let prom = new Promise((resolve, reject) => {
    setTimeout(async function () {
      console.log('Click Function');

      // console.log(value);
      // await sleep(1000)
      // console.log("Came Afterwords")
      await sleep(3000)
      resolve("data fetched")
    }, i * 6000);


  });

  // prom.then((message) => {
  //   console.log("resolved", message);
  // })
  let data = await prom
  console.log(data)

  
});

// console.log(await arrayMap);
