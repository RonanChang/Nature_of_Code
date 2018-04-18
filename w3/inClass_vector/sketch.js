var vector;
function setup() {
  createCanvas(500,600);
}

function draw() {
  background(0);
  
  vector = createVector(mouseX,mouseY);
  
  stroke(255);
  line(0,0,vector.x,vector.y);
  noStroke();
  fill(255);
  text(vector.mag(),vector.x,vector.y);
  
}