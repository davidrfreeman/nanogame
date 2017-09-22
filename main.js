let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
ctx.height = ctx.width = '400px';
// ctx.fillStyle = 'red';
// ctx.strokeStyle = 'red';
// ctx.beginPath();
// ctx.lineWidth = 15;
// ctx.arc(100,100,40,Math.PI*1.5,0,false);
// ctx.stroke();
// ctx.strokeStyle = 'green';
// ctx.beginPath();
// ctx.arc(95,100,40,Math.PI*1,Math.PI*1.5,false);
// ctx.stroke();


var green = {
  x:100,
  y:100,
  radius:40,
  sangle:Math.PI*1.5,
  eangle:0,
  color: 'green',
  lineWid:15
}

function draw(elem) {

  return  ctx.arc(elem.x,elem.y,elem.radius,elem.sangle,elem.eangle),
          ctx.strokeStyle = elem.color,
          ctx.lineWidth = elem.lineWid,
          ctx.stroke();
}
green.addEventListener('click',()=>alert("Wired"))

draw(green);
