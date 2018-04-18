"use strict";

class Particle {

  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = m;
    this.r = this.mass * 5;
    this.d = 2 * this.r;
    this.c = color(255);
    this.angle = random(360);

  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(8);

  }

  applyAttraction(other) {

    var distance = this.pos.dist(other.pos);
    distance = constrain(distance, 10, 25);
    var magnitude = (C * this.mass * other.mass) / (distance * distance);
    var force = p5.Vector.sub(other.pos, this.pos);
    force.normalize();
    force.mult(magnitude);
    this.applyForce(force);
  }

  checkCollision(other) {

    var distance = this.pos.dist(other.pos);
    if (distance < this.r + other.r) {
      //collide
      this.c = color(random(255), random(255), random(255));

      //this
      var force1 = p5.Vector.sub(other.pos, this.pos);
      force1.mult(0.1);
      other.applyForce(force1);

      //other
      var force2 = p5.Vector.sub(this.pos, other.pos);
      force2.mult(0.1);
      this.applyForce(force2);

    }

  }
  applyForce(force) {
    force.div(this.mass);
    //var f = p5.Vector.div(force,this.mass);
    this.acc.add(force);

  }
  edges() {

    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  bounce() {
    if (this.pos.x < this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    } else if (this.pos.x > width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    } else if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }

  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.c);
    rotate(radians( frameCount + this.angle ));
    //ellipse(0, 0, this.d, this.d);
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

}