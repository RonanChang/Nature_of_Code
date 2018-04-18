"use strict";
var vehicles = [];
var resolution = 50;
var rows, cols;
var angles = [];

function setup() {
  createCanvas(500, 600);
  rows = ceil(height / resolution);
  cols = ceil(width / resolution);

  for (var i = 0; i < 10; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(255);

  angles = [];
  var xoff = 0;
  var zoff;
  for (var x = 0; x < cols; x++) {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {


      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;

      // //mouse
      // var angleAdj = sin(frameCount * 0.01) * PI;
      // var pos = createVector(x, y);
      // var mousePos = createVector(mouseX, mouseY);
      // var vector = p5.Vector.sub(mousePos, pos);
      // var angle = vector.heading() + angleAdj;

      angles[index] = angle;


      push();
      stroke(0);
      translate(x*resolution, y*resolution);
      rotate(angles);
      line(0, 0, resolution/2, 0);
      pop();

      xoff++;
      yoff++;

    }

    zoff += 0.003;
  }

  for (var i = 0; i < vehicles.length; i++) {

    var target = createVector(mouseX, mouseY);
    //vehicles[i].seek(target);
    vehicles[i].flow(angles);
    vehicles[i].update();
    vehicles[i].edges();
    vehicles[i].display();

  }
}