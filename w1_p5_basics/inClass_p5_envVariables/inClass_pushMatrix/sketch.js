function setup() {
  createCanvas(600,500);
  rectMode(CENTER);
}

function draw() {
  background(100);
  
  
  push();//push() and pop() also work for translation, rotation function;
  translate(width/2,height/2);//translate the origin to (width/2, height/2)
  //rotate(frameCount/100);//slow the rotation
  rotate(radians(frameCount));//radians(),
  fill(255);
  rect(0,0,200,200);
  
  fill(255,0,0);
  rect(100,100,50,50);
  pop();
  
  noStroke();
  fill(255,255,0);
  rect(200,200,50,50);
  
}