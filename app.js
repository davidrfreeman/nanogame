// Commented out to expose vars and functions for testing
// window.addEventListener('load', () => {
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');

  let startButton = document.querySelector('#startgame');

  // number representing what round the player is on
  let round = 0;

  // array to hold the generated pattern
  let programPattern = [];
  // array to hold the players pattern
  let playerPattern = [];
  // buttons array hold objects that have information to draw each individual button
  let buttons = [
    {
      color: 'green',
      x: 150,
      y: 150,
      radius: 80,
      sangle: Math.PI*1.5,
      eangle: 0,
    },
    {
      color: 'red',
      x: 150,
      y: 155,
      radius: 80,
      sangle: Math.PI*0,
      eangle: Math.PI*0.5,
    },
    {
      color: 'yellow',
      x: 145,
      y: 155,
      radius: 80,
      sangle: Math.PI*0.5,
      eangle: Math.PI*1,
    },
    {
      color: 'blue',
      x: 145,
      y: 150,
      radius: 80,
      sangle: Math.PI*1,
      eangle: Math.PI*1.5,
    }
  ];

  // listener listens for clicks on the canvas
  canvas.addEventListener('click', (e) => {
    // these two varables store the x and y values of the click
    let x = e.offsetX,
        y = e.offsetY;
        console.log(x+" "+y)
    // if statements split the canvas into quadrants
    if(x < 150) {
      if(y<150) {
        // playerPattern.push(1);
        console.log('Blue');
        programPattern[round] === 1 ? (
          round++,
          populate()
        ) : (
          alert("You Lost")
        )
      } else {
        playerPattern.push(4);
        console.log('Yellow')
      }
    }
    if(x > 150) {
      if(y < 150) {
        playerPattern.push(2);
        console.log('Green')
      } else {
        playerPattern.push(3);
        console.log('Red')
      }
    }
  });

  // function to draw an arc, requires input to be provided, this will use the objects in the buttons array
  let draw = (elem) => {
    return ctx.beginPath(),
           ctx.lineWidth = 50,
           ctx.arc(elem.x, elem.y, elem.radius, elem.sangle, elem.eangle, false),
           ctx.strokeStyle = elem.color,
           ctx.stroke();
  };

  // generate a psuedo random number from 1-4, these numbers will be used to create a pattern of buttons to display to the player
  let randoNumber = () => {
    return Math.ceil(Math.random()*4);
  };

  // This will call the random number generator and push it to the end of the programPattern array
  let populate = () => {
    programPattern.push(randoNumber());
    console.log(programPattern);
  }

  // begins a new game
  let start = () => {
    if(round === 0) {
      buttons.map((i) => draw(i));
      populate();
      console.log("I've been clicked");
      startButton.className += " disabled";
      // removes listener so programPattern array cannot be altered by another button click
      startButton.removeEventListener('click', start);
    }
  }
  // listens for click to begin new game
  startButton.addEventListener('click', start);

  // iterate over the buttons array and call the draw function using each object in the array

// })
