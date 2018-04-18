function setup() {
  createCanvas(500, 600);

  background(0);
  noFill();
  stroke(255);
  drawCircle(width / 2, height / 2, 300);

}

function draw() {
  noLoop();

}

function drawCircle(x, y, dia) {
  ellipse(x, y, dia);
  dia = dia * 2 / 3;

  // if (dia > 10) {
  //   drawCircle(x, y - 30, dia);
  //   drawCircle(x, y + 30, dia);
  //   drawCircle(x + 30, y, dia);
  //   drawCircle(x - 30,y , dia);
  // }

  if (dia > 20) {
    drawCircle(x - dia, y, dia);
    drawCircle(x + dia, y, dia);
    drawCircle(x, y + dia, dia);
    drawCircle(x, y - dia, dia);
  }

}