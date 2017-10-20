// document.addEventListener('DOMContentLoaded', () => {
// Commented out to expose vars and functions for testing
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
      color: 'blue',
      blurred: 'rgb(157, 157, 255)',
      x: 145,
      y: 150,
      radius: 80,
      sangle: Math.PI*1,
      eangle: Math.PI*1.5,
    },
    {
      color: 'green',
      blurred: 'rgb(132, 224, 132)',
      x: 150,
      y: 150,
      radius: 80,
      sangle: Math.PI*1.5,
      eangle: 0,
    },
    {
      color: 'red',
      blurred: 'rgb(222, 143, 143)',
      x: 150,
      y: 155,
      radius: 80,
      sangle: Math.PI*0,
      eangle: Math.PI*0.5,
    },
    {
      color: 'yellow',
      blurred: 'rgb(248, 248, 214)',
      x: 145,
      y: 155,
      radius: 80,
      sangle: Math.PI*0.5,
      eangle: Math.PI*1,
    }
  ];


  

  // listener listens for mousedown on the canvas
  let checkPattern = (e) => {
    // these two varables store the x and y values of the click
    let x = e.offsetX,
        y = e.offsetY,
        i;
    console.log(x+" "+y)
    console.log(round);
    // if statements split the canvas into quadrants
    if (x < 150) {
      if(y<150) {
        draw(buttons[0]);
        i = 0;
        if(programPattern[round] !== 0) {
          lost();
          return;
        }
      } else {
        draw(buttons[3]);
        i = 3;
        if(programPattern[round] !== 3) {
          lost();
          return;
        }
      }
    }
    if(x>150) {
      if(y<150) {
        draw(buttons[1]);
        i = 1;
        if(programPattern[round] !== 1) {
          lost();
          return;
        }
      } else {
        draw(buttons[2]);
        i = 2;
        if(programPattern[round]!==2) {
          lost();
          return;
        } else {

        }
      }
    }
    if(programPattern.length - 1 === round) {
      round = 0;
      // delay pushing new selection to pattern, this is to delay the displaying of the pattern
      setTimeout(populate,500);
      return;
    }
    round++;
  };

  let playerSelection = (e) => {
    // these two varables store the x and y values of the click
    let x = e.offsetX,
        y = e.offsetY,
        i;
    // if statements split the canvas into quadrants
    if (x < 150) {
      if(y<150) {
       drawBlur(buttons[0])
      } else {
        drawBlur(buttons[3])
      }
    }
    if(x>150) {
      if(y<150) {
        drawBlur(buttons[1])
      } else {
        drawBlur(buttons[2])
      }
    }
    
  };


  

  canvas.addEventListener('mousedown', playerSelection);
  canvas.addEventListener('mouseup', checkPattern);

  // function to draw an arc, requires input to be provided, this will use the objects in the buttons array
  let draw = (elem) => {
    return ctx.beginPath(),
           ctx.lineWidth = 50,
           ctx.arc(elem.x, elem.y, elem.radius, elem.sangle, elem.eangle, false),
           ctx.strokeStyle = elem.color,
           ctx.stroke();
  };

 

  let drawBlur = (elem) => {
    return ctx.beginPath(),
    ctx.lineWidth = 50,
    ctx.arc(elem.x, elem.y, elem.radius, elem.sangle, elem.eangle, false),
    ctx.strokeStyle = elem.blurred,
    ctx.stroke();
  };


  // generate a psuedo random number from 1-4, these numbers will be used to create a pattern of buttons to display to the player
  let randoNumber = () => {
    return Math.floor(Math.random()*4);
  };

  // This will call the random number generator and push it to the end of the programPattern array
  let populate = () => {
    programPattern.push(randoNumber());
    console.log("Computer Pattern: " + programPattern);
    displayPattern(programPattern,0);
  }

  // begins a new game
  let start = () => {
    if(round === 0) {
      ctx.fillStyle = "rgb(94, 94, 94)";
      ctx.fillRect(0,0,canvas.width,canvas.height)
      // iterate over the buttons array and call the draw function using each object in the array
      buttons.map((i) => draw(i));
      window.setTimeout(populate,500);
      console.log("Round: " + round);
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
    ctx.font = '30px Arial';
    ctx.fillText("You Lost",100,150);
    startButton.disabled = false;
    startButton.addEventListener('click', start);
    console.log(round)
  }


// click shpws when a button has been clicked
let click = (obj,i,time) => {
  drawBlur(buttons[obj[i]]);
  window.setTimeout(() => {
    draw(buttons[obj[i]]);
  },time);
};

// this function will
let displayPattern = (obj,i) => {
  click(obj,i,500);
  window.setTimeout(function() {
    if(obj[i+1]!==undefined) {
      displayPattern(obj,i+1);
    };
  },1000);
};



  // listens for click to begin new game
  startButton.addEventListener('click', start);

// })
