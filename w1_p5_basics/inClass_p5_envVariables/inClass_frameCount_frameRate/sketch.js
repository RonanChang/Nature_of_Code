function setup() {
  createCanvas(500, 600);
  frameRate(10);

}

function draw() {

  background(0);

  //stroke(255);
  fill(255);
  text(frameCount, width / 2, height / 2);
  text(frameRate(), width / 2, height / 2 + 20);

}