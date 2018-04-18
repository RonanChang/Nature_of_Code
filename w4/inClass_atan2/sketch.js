function setup() {
  createCanvas(800,600);
}

function draw() {
  background(0);
  translate(width/2,height/2);
  stroke(255);
  var center = createVector(width/2,height/2);
  var mouse = createVector(mouseX,mouseY);
  var vector = p5.Vector.sub(mouse,center);
  line(0,0,vector.x,vector.y);
  
  
  //var angle = atan2(vector.y,vector.x);
  var angle = vector.heading();
  push();
  //triangle
  rotate(angle);
  fill(255,0,0);
  noStroke();
  triangle(0,0,-50,20,-50,-20);
  pop();
}