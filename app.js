// window.addEventListener('load', () => {
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');
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

  canvas.addEventListener('click', (e) => {
    let x = e.pageX,
        y = e.pageY;
        if(x < 150) {
          if(y<150) {
            console.log('Blue');
          } else {
            console.log('Yellow');
          }
        }
        if(x > 150) {
          if(y < 150) {
            console.log('Green');
          } else {
            console.log('Red')
          }
        }

        randomButton();
  });

  // function to draw an arc, requires input to be provided, this will use the objects in the buttons array
  function draw(elem) {
    return ctx.beginPath(),
           ctx.lineWidth = 40,
           ctx.arc(elem.x, elem.y, elem.radius, elem.sangle, elem.eangle, false),
           ctx.strokeStyle = elem.color,
           ctx.stroke();
  };

  // generate a psuedo random number from 1-4, these numbers will be used to create a pattern of buttons to display to the player
  function randomButton() {
    console.log(Math.ceil(Math.random()*4))
  };

  // map over the buttons array and call the draw function using each object in the array
  buttons.map((i) => draw(i))
// })
