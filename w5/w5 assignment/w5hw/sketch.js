"use strict";
var movers = [];
var g = 0.4;
var a;

function setup() {
  createCanvas(800, 400);

  for (var i = 0; i < 80; i++) {
    movers[i] = new Mover(random(2, 3), random(width), random(height));
  }
}

function draw() {
  a = new Attractor(mouseX, mouseY);
  var r = map(mouseX, 0, width, 50, 190);
  background(r, 144, 209);


  for (var i = 0; i < movers.length; i++) {
    for (var j = 0; j < movers.length; j++) {
      if (i != j) {
        var force = movers[j].attract(movers[i]);
        //movers[i].applyForce(force);
      }
    }
    var f = a.attract(movers[i]);
    a.display();

    movers[i].applyForce(f);
    movers[i].boundaries();
    movers[i].update();
    movers[i].display();
  }

}

class Mover {


  constructor(m, x, y) {
    this.mass = m;
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.h = 1;

  }



  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {


    push();
    translate(this.location.x, this.location.y)
    rotate(0.01 * frameCount);
    //ellipse(0, 0, this.mass * 10, this.mass * 10);
    noStroke();

    colorMode(HSL);

    fill(this.h, 75, 50, 0.8);
    this.h++;
    if (this.h > 360) {
      this.h = 1;
    }
    beginShape();
    for (var i = 0; i < 10; i++) {
      var x = cos(radians(i * 36)) * this.r;
      var y = sin(radians(i * 36)) * this.r;
      vertex(x, y);

      if (this.r == 2 * this.mass) {
        this.r = 5 * this.mass;
      } else {
        this.r = 2 * this.mass;
      }
    }
    endShape();
    pop();
  }

  attract(m) {
    var force = p5.Vector.sub(this.location, m.location);
    var distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    var strength = (g * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }

  boundaries() {

    var d = 50;
    var force = createVector(0, 0);

    if (this.location.x < d) {
      force.x = 1;
    } else if (this.location.x > width - d) {
      force.x = -1;
    }

    if (this.location.y < d) {
      force.y = 1;
    } else if (this.location.y > height - d) {
      force.y = -1;
    }

    force.normalize();
    force.mult(0.1);
    this.applyForce(force);
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
}

class Attractor {

  constructor(_x, _y) {
    this.location = createVector(_x, _y);
    this.mass = 20;
    this.G = 0.8;
  }


  attract(m) {
    var force = p5.Vector.sub(this.location, m.location);
    var d = force.mag();
    d = constrain(d, 20, 30);
    force.normalize();
    force.mult(this.G * this.mass * m.mass / (d * d));

    return force;
  }

  display() {
    push();
    translate(this.location.x, this.location.y);
    fill(237, 239, 134);
    noStroke();
    ellipse(0, 0, 36, 36);
    pop();
  }
}