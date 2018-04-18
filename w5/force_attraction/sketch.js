"use strict";

var particles = [];
var C = 30;


function setup() {
  createCanvas(800, 600);
  for (var i = 0; i < 10; i++) {
    particles[i] = new Particle(random(width), random(height), random(5, 10));
  }
  

}

function draw() {
  background(0);

  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    for (var j = 0; j < particles.length; j++) {
      if (i != j) {
        //p.applyAttraction(particles[j]);
        p.checkCollision(particles[j]);
      }
    }
    
    //p.edges();
    p.bounce();
    p.update();
    p.display();

  }
}