function setup() {
  createCanvas(400, 500);
  background(0);
}

function draw() {

}

function keyPressed() {
  print(key);
  //must be capital letters
  if (key == 'A') {
    background(random(255), random(255), random(255));
  }
  
    //keyCode only works in keyPressed
    if(keyCode == LEFT_ARROW){
    
    
    background(175);
  }
}


/*function keyTyped() {


  print(key);
  //this can be lowercase letters
  if (key == 'a') {
    background(random(255), random(255), random(255));
  }
  

}*/