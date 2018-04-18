function setup() {
  createCanvas(600,500);
  background(100);
  
  push();               i//instead of pushStyle();
  //rect(x,y,w,h)
  stroke(255,0,0);
  strokeWeight(4);
  fill(255,255,0);
  rect(100,100,200,100);
  pop();                //the style will be removed here.
  
  fill(0,255,255);
  rect(300,300,200,100);
}

function draw() {
  
}