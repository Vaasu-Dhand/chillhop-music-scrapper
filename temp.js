let somethingElse = document.querySelectorAll('.track-single');
              
  somethingElse.forEach(async (track, index) => {  

    let elementRef = document.querySelector('div#player-controlls').classList
      
    let checkOne = new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if (elementRef.contains('jp-state-seeking')) {
          resolve('Promise Resolved')
          clearInterval(interval)
        } else {
          reject('Promise Rejected')
        }
      }, 1000);
    })
    await checkOne; // Wait 1

    let checkTwo = new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if (!elementRef.contains('jp-state-seeking')) {
          resolve('Promise Resolved')
          clearInterval(interval)
        } else {
          reject('Promise Rejected')
        }
      }, 1000);
    })
    await checkTwo; // Wait 2

    track.querySelector(`a.track-${track.children[0]?.getAttribute('data-track')}`).click();   // ! Causes the error when executed quickly

  })
