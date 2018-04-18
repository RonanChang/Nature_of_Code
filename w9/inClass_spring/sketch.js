"use strict";
var ballA, ballB;
var spring;


function setup() {
  createCanvas(500, 600);
  
  ballA = new Ball(width / 2, height / 2, 5);
  ballB = new Ball(width / 2 + 100, height / 2 + 100, 5);
  spring = new Spring(ballA, ballB, 200);
}

function draw() {
  background(0);


  var gravity = createVector(0,1);
  gravity.mult(ballB.mass);
  //ballB.applyForce(gravity);
  spring.update();
  spring.display();

  ballA.update();
  ballA.drag();
  ballA.display();

  ballB.update();
  ballB.drag();
  ballB.display();
}