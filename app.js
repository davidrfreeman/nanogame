// Commented out to expose vars and functions for testing
// document.addEventListener('DOMContentLoaded', () => {
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
      blurred: 'rgb(247, 247, 119)',
      x: 145,
      y: 155,
      radius: 80,
      sangle: Math.PI*0.5,
      eangle: Math.PI*1,
    }
  ];

  // listener listens for mousedown on the canvas
  let buttonClick = (e) => {
    // these two varables store the x and y values of the click
    let x = e.offsetX,
        y = e.offsetY,
        i;
    console.log(x+" "+y)
    console.log(round);
    // if statements split the canvas into quadrants
    if (x < 150) {
      if(y<150) {
        i = 0;
        // selection(i);
        if(programPattern[round] !== 0) {
          lost();
          return;
        } else {
          selection(i);
        }
      } else {
        i = 3;
        // selection(i);
        if(programPattern[round] !== 3) {
          lost();
          return;
        } else {
          selection(i);
        }
      }
    }
    if(x>150) {
      if(y<150) {
        i = 1;
        // selection(i);
        if(programPattern[round] !== 1) {
          lost();
          return;
        } else {
          selection(i);
        }
      } else {
        i = 2;
        // selection(i);
        if(programPattern[round]!==2) {
          lost();
          return;
        } else {
          selection(i);
        }
      }
    }
    if(programPattern.length - 1 === round) {
      round = 0;
      canvas.removeEventListener('mouseup', buttonClick);
      selection(i).then(populate());
      return;
    }
    round++;
    };

  // function to draw an arc, requires input to be provided, this will use the objects in the buttons array
  let draw = (elem) => {
    return ctx.beginPath(),
           ctx.lineWidth = 50,
           ctx.arc(elem.x, elem.y, elem.radius, elem.sangle, elem.eangle, false),
           ctx.strokeStyle = elem.color,
           ctx.stroke();
  };

  // this function will 'illuminate' a button when selected by a player
  let selection = async (i) => {
    drawBlur(buttons[i]);
    setTimeout(()=>draw(buttons[i]),500);
  }

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

function simulateClick(obj,i) {
  drawBlur(buttons[obj[i]]);
  window.setTimeout(() => {
    draw(buttons[obj[i]]);
  },500);
};

function displayPattern(obj,i) {
  simulateClick(obj,i);
  window.setTimeout(function() {
    if(obj[i+1]!==undefined) {
    simulateClick(obj,i+1);
    };
  },1000);
};



  // listens for click to begin new game
  startButton.addEventListener('click', start);

// })
