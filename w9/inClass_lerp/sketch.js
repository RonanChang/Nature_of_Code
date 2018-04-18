var x = 0;

function setup() {
  createCanvas(500,600);
}

function draw() {
  background(0,50);
  x = lerp(x,width,0.05);
  noStroke();
  ellipse(x,height/2,30,30);
}