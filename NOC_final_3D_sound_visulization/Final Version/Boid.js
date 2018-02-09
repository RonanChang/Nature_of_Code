"use strict";

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y, random(-300, 300));
    //this.pos = p5.Vector.random3D();
    //this.vel = createVector(random(0.5, 0), random(-0.5, 0.5), random(-0.5, 0.5));
    this.vel = p5.Vector.random3D();
    this.acc = createVector();

    this.maxSpeed = 2; // max speed;
    this.maxSteerForce = 2; // max steering force

    this.separateDistance = 20;
    this.neighborDistance = 80;

    this.size = floor(random(1, 2));
    //this.a = random(100, 200);

    this.addColor = false;
  }
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed); //***
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  applyForce(force) {
    this.acc.add(force);
  }
  flock(others) {
    var sForce = this.separate(others);
    var cForce = this.cohesion(others);
    var aForce = this.align(others);

    sForce.mult(1.5);
    cForce.mult(0.5);
    aForce.mult(1.2);

    this.applyForce(sForce);
    this.applyForce(cForce);
    this.applyForce(aForce);
  }
  align(others) {
    var velocity = createVector();
    var count = 0;
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if (distance > 0 && distance < this.neighborDistance) {
        velocity.add(other.vel);
        count++;
      }
    }
    if (count > 0) {
      velocity.div(count);
      velocity.setMag(this.maxSpeed);
      // steering force
      var steer = p5.Vector.sub(velocity, this.vel);
      steer.limit(this.maxSteerForce);
      return steer;
    }
    return velocity; // empty
  }
  cohesion(others) {
    var position = createVector();
    var count = 0;
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if (distance > 0 && distance < this.neighborDistance) {
        position.add(other.pos);
        count++
      }
    }
    if (count > 0) {
      position.div(count);
      return this.seek(position);
    }
    return position; // empty
  }
  separate(others) {
    var vector = createVector();
    var count = 0;
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);

      if (distance > 0 && distance < this.separateDistance) {
        var diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(distance);
        vector.add(diff);
        count++;
      }
    }
    if (count > 0) {
      vector.div(count);
    }
    if (vector.mag() > 0) {
      //desired
      vector.setMag(this.maxSpeed);
      // steer
      vector.sub(this.vel);
      vector.limit(this.maxSteerForce);
    }
    return vector;
  }
  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce);
    return steer;
    //this.applyForce(steer);
  }
  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var f = vectors[index];

    this.applyForce(f);
  }

  drawLines(others) {
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if (distance > 0 && distance < this.neighborDistance) {

        beginShape();
        vertex(this.pos.x,this.pos.y,this.pos.z);
        vertex(other.pos.x,other.pos.y,other.pos.z);
        endShape();
      }
    }

  }
  checkEdges() {
    // x
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  shine(clr,sz) {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    if (this.addColor == false) {
      fill(0, 0, clr);
    }
    box(sz);
    pop();

  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    fill(0,0,100);
    box(this.size);
    pop();
  }
}
