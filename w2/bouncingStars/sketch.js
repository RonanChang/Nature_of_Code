"use strict";
var stars = [];
var _mouseX;
var _mouseY;

function setup() {
  createCanvas(600, 600);
  colorMode(HSL);
  for (var i = 0; i < 5; i++) {
    //stars[i] = new Star();
    stars.push(new Star(random(width),0,random(3)));
  }


}

function draw() {
  _mouseX = map(mouseX, 0, 600, 0, 360);
  _mouseY = map(mouseY, 0, 600, 0, 360);
  background(_mouseX, _mouseY, 50, 0.5);


  for (var j = 0; j < 12; j++) {
    noStroke();
    push();
    fill(j * 10, 100, 50, 0.4);
    rect(j * 50, 0, 50, height);
    pop();
    push();
    fill(360 - j * 10, 100, 50, 0.4);
    rect(0, j * 50, width, 50);
    pop();
  }
  //Apply gravity
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    var gravity = createVector(0, 0.2);
    gravity.mult(star.mass);
    star.applyForce(gravity);

    star.move();
    star.edges();
    star.display();
  }
}

//Apply wind
function mousePressed() {
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    var wind = createVector(5, 0);
    star.applyForce(wind);
  }
  
   stars.push(new Star(mouseX,mouseY,random(3)));

}



class Star {
  constructor(_x,_y,_mass) {
    this.location = createVector(_x,_y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = _mass;
    this.f = createVector(0, 0);
    this.radius = 25 * this.mass;
    this.frameSpeed = random(0.01,0.05);
    this.angle = random(TWO_PI);
  }
  move() {

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(10);
  }
  applyForce(force) {
    this.f = p5.Vector.div(force, this.mass);
    this.acceleration.add(this.f);
  }
  edges() {
    if (this.location.x < this.radius) {
      this.velocity.x *= -1;
      this.location.x = this.radius;
    } else if (this.location.x > width - this.radius) {
      this.velocity.x *= -1;
      this.location.x = width - this.radius;
    }

    if (this.location.y < this.radius) {
      this.velocity.y *= -1;
      this.location.y = this.radius;
    } else if (this.location.y > height - this.radius) {
      this.velocity.y *= -1;
      this.location.y = height - this.radius;
    }
  }

  display() {
    push();
    noStroke();

    translate(this.location.x, this.location.y);
    rotate(frameCount*this.frameSpeed + this.angle);
    beginShape();
    fill(0, 0, 100, 0.7);
    for (var i = 0; i < 10; i++) {
      var x = cos(radians(i * 36)) * this.radius;
      var y = sin(radians(i * 36)) * this.radius;
      vertex(x, y);

      if (this.radius == 25 * this.mass) {
        this.radius = 12 * this.mass;
      } else {
        this.radius = 25 * this.mass;
      }
    }
    endShape();
    pop();
  }
}