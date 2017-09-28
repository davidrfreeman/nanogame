// Commented out to expose vars and functions for testing
document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');

  let startButton = document.querySelector('#startgame');

  // number representing what round the player is on
  let round = 0;

  // array to hold the generated pattern
  let programPattern = [];
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
    console.log(round);
    // if statements split the canvas into quadrants
    if (x < 150) {
      if(y<150) {
        if(programPattern[round] !== 1) {
          lost();
          return;
        }
      } else {
        if(programPattern[round] !== 4) {
          lost();
          return;
        }
      }
    }
    if(x>150) {
      if(y<150) {
        if(programPattern[round] !== 2) {
          lost();
          return;
        }
      } else {
        if(programPattern[round]!==3) {
          lost();
          return;
        }
      }
    }
    if(programPattern.length - 1 === round) {
      round = 0;
      populate();
      return;
    }
    round++;
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
    console.log(round);
  }

  // begins a new game
  let start = () => {
    if(round === 0) {
      // iterate over the buttons array and call the draw function using each object in the array
      buttons.map((i) => draw(i));
      populate();
      console.log("I've been clicked");
      console.log(round);
      startButton.disabled = true;
      // removes listener so programPattern array cannot be altered by another button click
      startButton.removeEventListener('click', start);
    }
  }

  let lost = () => {
    console.log("You Lost");
    round = 0;
    programPattern = [];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    startButton.disabled = false;
    startButton.addEventListener('click', start);
    console.log(round)
  }
  // listens for click to begin new game
  startButton.addEventListener('click', start);

})
