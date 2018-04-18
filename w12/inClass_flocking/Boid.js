"use strict"

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector();

    this.maxSpeed = 3; // max speed;
    this.maxSteerForce = 0.05; // max steering force
    this.separateDistance = 30;
    this.neighborDistance = 50;
  }
  update() {
    this.vel.add(this.acc);
    //this.vel.limit(this.maxSpeed); // ***
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  applyForce(force) {
    this.acc.add(force);
  }
  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed); // ***
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce);
    //this.applyForce(steer);
    return steer;
  }

  flock(others) {
    var sForce = this.separate(others);
    var cForce = this.cohesion(others);
    var aForce = this.align(others);
    
    sForce.mult(1.0);
    cForce.mult(1.0);
    aForce.mult(1.0);
    
    this.applyForce(sForce);
    this.applyForce(cForce);
    this.applyForce(aForce);
  }
  separate(others) {
    ///avg of vectors
    var vector = createVector(); //sum
    var count = 0;
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);

      if (distance < this.separateDistance && distance > 0) {
        //vectors!
        var diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(distance);

        //sum += value
        vector.add(diff);
        count++;
      }
    }

    if (count > 0) {
      vector.div(count);
    }

    if (vector.mag() > 0) {
      //desired vector
      vector.setMag(this.maxSpeed);
      //steering
      vector.sub(this.vel);
      vector.limit(this.maxSteerForce);
    }
    //applyForce
    //this.applyForce(vector);
    return vector;
  }

  cohesion(others) {
    var position = createVector();
    var count = 0;
    //for loop
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if (distance > 0 && distance < this.neighborDistance) {
        position.add(other.pos);
        count++;
      }
    }

    if (count > 0) {
      position.div(count);
      return this.seek(position);
    }
    return position;
  }
  align(others) {
    var velocity = createVector();
    var count = 0;
    //for loop
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
      var steer = p5.Vector.sub(velocity, this.vel);
      steer.limit(this.maxSteerForce);
      //this.applyForce(steer);
      return steer;
    }
    return velocity;
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
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(255);
    triangle(0, 0, -20, 8, -20, -8);

    pop();
  }
}