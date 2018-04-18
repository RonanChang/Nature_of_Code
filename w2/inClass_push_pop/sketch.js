function setup() {
  createCanvas(500, 600);
  rectMode(CENTER);
  noStroke();

}

function draw() {
  background(100);

  fill(0, 255, 0);
  flower(mouseX, mouseY);

  fill(255, 0, 0);
  flower(100, 100); //here we translate it again;

  fill(0, 0, 255);
  flower(300, 300);
}

function flower(x, y) {
  //we give two var x and y to pass on to the function;
  //translate(width / 2, height / 2);
  translate(x, y);
  //fill(255, 0, 0);
  ellipse(0, 0, 5, 5);

  for (var angle = 0; angle < 360; angle += 72) {
    push();
    /*if we don't put push and pop here,
    we will rotate the original rect 72 degree to rect1,
    and then we rotate rect1 144 degree(because of the for loop)
    
    */
    rotate(radians(angle));
    rotate(frameCount * 0.02);
    //fill(255, 255, 0);
    rect(100, 0, 100, 20);
    pop();
  }
}