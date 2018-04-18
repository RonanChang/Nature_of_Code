var angle;

function setup() {
  createCanvas(500, 600);
  angle = PI / 6;

}

function draw() {

  background(255);
  //angle = map(mouseX, 0, width, PI / 2, 0);
  translate(width / 2, height);
  branch(200);
  noLoop();
}

function branch(len) {

  var sw = map(len, 200, 0, 30, 0);
  strokeWeight(sw);
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 10) {

    push();
    rotate(angle + random(-0.3, 0.3));
    branch(len * 2 / 3 * random(0.7, 1.3));
    pop();

    push();
    rotate(-angle + random(-0.3, 0.3));
    branch(len * 2 / 3 * random(0.7, 1.3));
    pop();

    push();
    rotate(random(-0.3, 0.3));
    branch(len * 2 / 3 * random(0.7, 1.3));
    pop();
  }
}