var angle;
var wind;

function setup() {
  createCanvas(800, 600);
  angle = PI / 6;

}

function draw() {

  background(255);

  wind = noise(frameCount * 0.005, 0, 1, -0.2, 0.2);

  translate(width / 2, height);
  branch(200);
  //noLoop();
}

function branch(len,diff) {

  var sw = map(len, 200, 0, 30, 0);
  strokeWeight(sw);
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 10) {
    //noise angle
    var noiseAngleR = map(noise(100),0,1,0.3,-0.3);
    var noiseAngleL = map(noise(200),0,1,0.3,-0.3);
    
    push();
    rotate(angle + wind + noiseAngleR);
    branch(len * 2 / 3);
    pop();

    push();
    rotate(-angle + wind + noiseAngleR);
    branch(len * 2 / 3);
    pop();

  }
}