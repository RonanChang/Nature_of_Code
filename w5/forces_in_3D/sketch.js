"use strict";

var FLOOR_LEVEL = -200;
var FLOOR_SIZE = 800;
var particles = [];

function setup() {
  createCanvas(1000, 600, WEBGL);

  for (var i = 0; i < 50; i++) {
    particles[i] = new Particle()
      .position(random(-100, 100), random(200, 300), random(-100, 100)) // because position() return "this", the particle itself
      .velocity(random(-3, 3), random(-3, 3), random(-3, 3)); //it can use function after function

  }
}

function draw() {
  background(0);
  scale(1, -1, 1); //to flip y axis
  //navigate
  var rotY = map(mouseX, 0, width, -PI / 2, PI / 2);
  rotateY(rotY);
  var rotX = map(mouseY, 0, height, -PI / 6, PI / 6);
  rotateX(rotX);

  //floor
  push();
  translate(0, FLOOR_LEVEL, 0);
  rotateX(PI / 2);
  fill(50);
  plane(FLOOR_SIZE, FLOOR_SIZE);
  //light
  ambientLight(0, 0, 30); //r,g,b
  pointLight(255, 255, 255, 0, 300, 0); //r,g,b,x,y,z
  pop();

  //particles
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    for (var j = 0; j < particles.length; j++) {
      if (i != j) {
        p.checkCollision(particles[j]);
      }
    }
    var gravity = createVector(0, -1, 0);
    gravity.mult(p.mass);
    p.applyForce(gravity);

    //friction 
    //we add if() because we don't want air resistence, only add th friciton near floor
    // + 0.1, because balls will bounce.
    if (p.pos.y < FLOOR_LEVEL + p.rad + 0.1) {
      var friction = p.vel.copy();
      friction.normalize();
      friction.mult(-0.5);
      friction.limit(p.vel.mag());
      p.applyForce(friction);
    }
    p.update();
    p.checkFloorWall();
    p.display();
  }
}