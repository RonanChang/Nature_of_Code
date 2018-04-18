"use strict";
var waterdrops = [];

function setup() {
  createCanvas(800, 600);
  waterdrops.push(new Splashing());
}

function draw() {
  background(0);
  stroke(255, 0, 0);
  strokeWeight(2);
  line(0, height / 2, width, height / 2);

  waterdrops.push(new Splashing());
  var friction = createVector(0, -0.5);
  var gravity = createVector(0, 0.1);

  if (waterdrops[i].loc.y >= height / 2) {
    waterdrops[i].applyForce(friction);
  }
  
  for(var i = 0;i<10;i++){
      waterdrops[i].applyForce(gravity);
  
  waterdrop[i].update();
  waterdrop[i].display();
  }
}