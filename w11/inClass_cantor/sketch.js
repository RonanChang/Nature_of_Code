function setup() {
  createCanvas(500, 600);
  noStroke();
  fill(0);
  cantor(0,0,width);
}

function draw() {
  noLoop();
}

function cantor(x, y, len) {
  var h = 40;
  rect(x, y, len, 20);

  if (len > 10) {
    cantor(x, y + h, len / 3);
    cantor(x + len * 2 / 3, y + h, len / 3);

  }
}