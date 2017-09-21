// window.addEventListener('load', () => {
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');
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
  // let green = buttons[0];
  // green.addEventListener('click', ()=> alert("You clicked Green"));
  canvas.addEventListener('click', (e) => {
    let x = e.pageX,
        y = e.pageY;
        alert(x+' '+y);
        randomButton();
  })
  function draw (elem) {
    return ctx.beginPath(),
           ctx.lineWidth = 40,
           ctx.arc(elem.x, elem.y, elem.radius, elem.sangle, elem.eangle, false),
           ctx.strokeStyle = elem.color,
           ctx.stroke();
  }

  function randomButton() {
    console.log(Math.ceil(Math.random()*4))
  }

  buttons.map((i) => {
    return draw(i);
  })
// })
