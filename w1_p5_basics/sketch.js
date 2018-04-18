function setup() {

  createCanvas(500, 600);
  background(100); // 175 is a lighter grey
  //0 - 255
  //w
  //w,alpha
  //r,g,b
  //r,g,b,a


  
}

function draw() {


var rectSize = 20;


  for (var y = 0; y < height; y = y + rectSize) {
  for (var x = 0; x < width; x = x + rectSize) {

    noStroke();
    fill(random(255), random(255), random(255));

    //ellipse(x,height/2,40,40);
    rect(x, y, rectSize, rectSize);
  }
  }


}