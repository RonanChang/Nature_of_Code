"use strict"

var vehicles = [];

function setup() {
  createCanvas(500, 600);
  vehicles.push(new Vehicle(width / 2, height / 2));
}

function draw() {
  background(0);

  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    var target = createVector(mouseX, mouseY);
    // v.seek(target);
    v.detect(target);
    v.update();
    v.checkEdges();
    v.display();
  }
}