// document.addEventListener('DOMContentLoaded', () => {
// Commented out to expose vars and functions for testing
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');

  let startButton = document.querySelector('#startgame');
  let strict = document.querySelector('#strict')
  let restart = document.querySelector('#reset')

  let strictMode = false
  
  let strictFunc = () => {
    strictMode === false ? (
      strictMode = true,
      strict.classList.remove("btn-default"),
      strict.classList.add("btn-danger"),
      strict.removeEventListener('click', strictFunc)
    ) : console.log("Already selected");
  }

  let restartFunc = () => {
    restart.removeEventListener('click', restartFunc)
    strictMode = false
    round = 0
    programPattern = []
    start()
  }

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
      sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
    },
    {
      color: 'green',
      blurred: 'rgb(132, 224, 132)',
      x: 150,
      y: 150,
      radius: 80,
      sangle: Math.PI*1.5,
      eangle: 0,
      sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
    },
    {
      color: 'red',
      blurred: 'rgb(222, 143, 143)',
      x: 150,
      y: 155,
      radius: 80,
      sangle: Math.PI*0,
      eangle: Math.PI*0.5,
      sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
    },
    {
      color: 'rgb(242, 220, 0)',
      blurred: 'rgb(248, 248, 214)',
      x: 145,
      y: 155,
      radius: 80,
      sangle: Math.PI*0.5,
      eangle: Math.PI*1,
      sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
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
        buttons[0].sound.play();
        draw(buttons[0]);
        
        i = 0;
        if(programPattern[round] !== 0) {
          strictMode === true ? lost() : (
            setTimeout(() => displayPattern(programPattern, 0),500),
            round = 0
          );
          return;
        }
      } else {
        buttons[3].sound.play();
        draw(buttons[3]);
        
        i = 3;
        if(programPattern[round] !== 3) {
          strictMode === true ? lost() : (
            setTimeout(() => displayPattern(programPattern, 0),500),
            round = 0
          );
          return;
        }
      }
    }
    if(x>150) {
      if(y<150) {
        buttons[1].sound.play();
        draw(buttons[1]);
        
        i = 1;
        if(programPattern[round] !== 1) {
          strictMode === true ? lost() : (
            setTimeout(() => displayPattern(programPattern, 0),500),
            round = 0
          );
          return;
        }
      } else {
        buttons[2].sound.play();
        draw(buttons[2]);
        
        i = 2;
        if(programPattern[round]!==2) {
          strictMode === true ? lost() : (
            setTimeout(() => displayPattern(programPattern, 0),500),
            round = 0
          );
          return;
        }
      }
    }
    if(programPattern.length - 1 === round) {
      if(programPattern.length === 20 ) {
        setTimeout(won, 500)
        return
      }
      round = 0;
      // delay pushing new selection to pattern, this is to delay the displaying of the pattern
      setTimeout(populate,550);
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

  // function to draw an arc, requires input to be provided, this will use the objects in the buttons array
  let draw = (elem) => {
    return ctx.beginPath(),
           ctx.lineWidth = 50,
           ctx.arc(elem.x, elem.y, elem.radius, elem.sangle, elem.eangle, false),
           ctx.strokeStyle = elem.color,
           ctx.stroke();
  };

 
  // this function will redraw an arc with a lighter color to give the appeance of a lit button 
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
    let roundDisplay = document.querySelector('#round');
    roundDisplay.innerText = String(programPattern.length);
    console.log("Computer Pattern: " + programPattern);
    displayPattern(programPattern,0);
  }

  // begins a new game
  let start = () => {
    if(round === 0) {
      strict.classList.contains("hidden") ? (
        strict.classList.remove("hidden"),
        startButton.classList.add("hidden"),
        strict.addEventListener('click', strictFunc)
      ) : (
        console.log("Element not hidden")
      )
      restart.style.visibility = "visible";
      restart.addEventListener('click', restartFunc)
      ctx.fillStyle = "rgb(94, 94, 94)";
      ctx.fillRect(0,0,canvas.width,canvas.height)
      // iterate over the buttons array and call the draw function using each object in the array
      buttons.map((i) => draw(i));
      setTimeout(populate,1000);
      let roundCount = document.querySelector('#roundCount');
      roundCount.style.visibility = "visible";
      console.log("Round: " + round);
      startButton.disabled = true;
      // removes listener so programPattern array cannot be altered by another button click
      startButton.removeEventListener('click', start);
      canvas.addEventListener('mousedown', playerSelection);
      canvas.addEventListener('mouseup', checkPattern);
    }
  }

  //  resets the game if an incorrect selection has been made
  let lost = () => {
    strictMode = false
    strict.classList.add("hidden")
    strict.classList.remove("btn-danger")
    strict.classList.add("btn-default")
    startButton.classList.remove("hidden")  
    console.log("You Lost");
    round = 0;
    programPattern = [];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = '30px Arial';
    ctx.fillText("You Lost",100,150);
    startButton.disabled = false;
    startButton.addEventListener('click', start);
    console.log(round);
    //  I want to not allow the player's clicks to do anything until the game has been reset
    canvas.removeEventListener('mousedown',playerSelection);
    canvas.removeEventListener('mouseup', checkPattern);
  }

  let won = () => {
    console.log("YOU WON!!")
    round = 0
    programPattern = []
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.font = '30px Arial'
    ctx.fillText("YOU WON!!", 100,150)
    startButton.disabled = false
    startButton.addEventListener('click', start)
  }


// click shows when a button has been clicked
let click = (obj,i,time) => {
  buttons[obj[i]].sound.play();
  drawBlur(buttons[obj[i]]);
  window.setTimeout(() => {
    draw(buttons[obj[i]]);
  },time);
};

// this function will effectually loop through the programPattern array and display it to the player
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

// });
