"use strict";
//for the canvas
var scl = 15;
var inc = 0.1;
var cols, rows;
var zoff = 0;
var fr;
var flowfield;
var r = 500;
var targetR = 200;
var lightRange;
var particles = [];
var numParticles = 1500;
var pcm = [];
var duration = 1;
var length = 2048;
var sizeRange;
var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple'
});
var instigated = false;
var fileName;
var up;
var down;
var amp;
var boids = [];

//for the star
var globe = [];
var total = 50;
var m = 0;
var a = 1;
var b = 1;
var mchange;
var offset = 0;

var param = {
  addBoids: false,
  addDonut: false,
  shine: true,
  addShape: false,
  addColor: false,
  superShapeShine: false,
  drawLines: false,
  star3D: false,
  star2D: false,
  starChange: false,
  starChange3D: false,
  addStaticStar: true,
  addLine: false
};

var gui = new dat.gui.GUI();
gui.add(param, 'addBoids');
gui.add(param, 'addDonut');
gui.add(param, 'shine');
gui.add(param, 'addShape');
gui.add(param, 'addColor');
gui.add(param, 'superShapeShine');
//gui.add(param, 'drawLines');
//gui.add(param, 'ambientLight');
gui.add(param, 'star3D');
gui.add(param, 'star2D');
gui.add(param, 'starChange');
gui.add(param, 'starChange3D');
gui.add(param, 'addStaticStar');
gui.add(param, 'addLine');


wavesurfer.on('ready', function() {
  wavesurfer.play();
  duration = wavesurfer.getDuration();
  pcm = JSON.parse(wavesurfer.exportPCM(length, 20000, true, 0));

  var scale = (duration * 1000) / (length * 2);
  if (!instigated) {
    setTimeout(doThis, scale);
  }
  instigated = true;
});


function setup() {
  //pixelDensity(1);
  //createCanvas(1000, 650, WEBGL);
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);




  for (var i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }


  for (var i = 0; i < 500; i++) {
    //boids.push(new Boid());
    boids.push(new Boid(random(width), random(height)));
  }

}

function spherical(u, v) {

  var x = r * cos(u) * sin(v);
  var y = r * sin(u) * sin(v);
  var z = r * cos(v);

  return [x, y, z];
}

function spherical2(u, v) {
  var r1 = r + 50 * cos(6 * v);
  var r2 = r + 100 * cos(6 * v);
  var x = r1 * cos(u) * sin(v);
  var y = r1 * sin(u) * sin(v);
  var z = r2 * cos(v);

  return [x, y, z];
}

function mobius(u, v) {
  var x = (1 - v * sin(u)) * cos(2 * u);
  var y = (1 - v * sin(u)) * sin(2 * u);
  var z = v * cos(u);

  return [x, y, z];
}

function donut(u, v) {
  var tube = r / 10;
  var radius = r * 1.6;
  var x = (radius + tube * cos(u)) * cos(v);
  var y = (radius + tube * cos(u)) * sin(v);
  var z = tube * sin(u);

  return [x, y, z];
}

function donut2(u, v) {
  var tube = r / 4;
  var radius = r;
  var r1 = radius + 50 * cos(5 * v);
  var r2 = tube;
  var x = ((r1) + (r2) * cos(u)) * cos(v);
  var y = ((r1) + (r2) * cos(u)) * sin(v);
  var z = r2 * sin(u);

  return [x, y, z];
}

function supershape(theta, m, n1, n2, n3) {
  var t1 = abs((1 / a) * cos(m * theta / 4));
  t1 = pow(t1, n2);
  var t2 = abs((1 / b) * sin(m * theta / 4));
  t2 = pow(t2, n3);
  var t3 = t1 + t2;
  var r_star = pow(t3, -1 / n1);
  return r_star;
}


function blendPoint(x, y, xWeight, yWeight) {
  var newPoints = [];
  if (x.length == y.length) {
    for (var i = 0; i < x.length; i++) {
      newPoints.push(x[i] * xWeight + y[i] * yWeight);
    }
  }

  return newPoints;
}

function doThis() {
  // we round to the nearest even number
  if (wavesurfer.isPlaying()) {
    var position = Math.round((wavesurfer.getCurrentTime() / duration) * length) * 2;
    var up = pcm[position];
    var down = pcm[position + 1];
    var maxSz = 250 / 650 * height;

    targetR = map(sqrt(up ** 2 + down ** 2), 0, sqrt(2), 100, maxSz);
    lightRange = map(sqrt(up ** 2 + down ** 2), 0, sqrt(2), 0, 100);
    sizeRange = map(sqrt(up ** 2 + down ** 2), 0, sqrt(2), 0, 5);
    mchange = map(sqrt(up ** 2 + down ** 2), 0, sqrt(2), 0, 9);
    amp = sqrt(up ** 2 + down ** 2);
    console.log(sqrt(up ** 2 + down ** 2)); //two * can't be separated. Use this in Atom.


    // add update field function here
    //for each small grid
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;

        noiseDetail(1, 0.2);
        var noiseN = noise(up * down, zoff);
        var distance = dist(x, y, width / 2, height / 2);
        var angle = -(noiseN * distance * PI / 2) - (PI / 2);

        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;
      }
      yoff += inc;
      zoff += 0.003;

    }

    var scale = (duration * 1000) / (length * 2);
    setTimeout(doThis, scale);
  }
}

function staticStar(_x, _y, _z) {
  //m = 4;
  var r_star = 70;
  var total_1 = 20;

  for (var i = 0; i < total_1 + 1; i++) {
    var lat = map(i, 0, total_1, -PI / 2, PI / 2);
    //var r2_star = supershape(lat, m, 2, 1.7, 1.7);
    var r2_star = supershape(lat, 1.16667, 0.3, 0.3, 0.3);

    for (var j = 0; j < total_1 + 1; j++) {
      var lon = map(j, 0, total_1, -PI, PI);
      //var r1_star = supershape(lon, m, 2, 1.7, 1.7);
      var r1_star = supershape(lon, 0, 1, 1, 1);

      var x_star = r_star * r1_star * cos(lon) * r2_star * cos(lat);
      var y_star = r_star * r1_star * sin(lon) * r2_star * cos(lat);
      var z_star = r_star * r2_star * sin(lat);
      var index = i + j * (total_1 + 1);

      globe[index] = createVector(x_star, y_star, z_star);
    }
  }

  //offset += 0.001; //about color

  for (var i = 0; i < total_1; i++) {
    push();
    translate(_x, _y, _z);

    //beginShape(TRIANGLE_STRIP);
    for (var j = 0; j < total_1 + 1; j++) {
      var index1 = i + j * (total_1 + 1);
      var v1 = globe[index1];
      // vertex(v1.x, v1.y, v1.z);
      //
      // var index2 = (i + 1) + j * (total_1 + 1);
      // var v2 = globe[index2];
      // vertex(v2.x, v2.y, v2.z);

      push();
      translate(v1.x, v1.y, v1.z);
      var h = map(i, 0, total_1, 0, 360);
      fill(h, 100, 50);
      sphere(1);
      pop();
    }
    //endShape();
    pop();
  }

}

function star2D() {
  //background star
  m = 5;
  // background(0);
  // noStroke();

  var r_star = 150;
  for (var i = 0; i < total + 1; i++) {
    var lat = map(i, 0, total, -PI / 2, PI / 2);
    var r2_star = supershape(lat, m, 0.2, 1.7, 1.7);

    for (var j = 0; j < total + 1; j++) {
      var lon = map(j, 0, total, -PI, PI);
      var r1_star = supershape(lon, m, 0.2, 1.7, 1.7);

      var x_star = targetR * r1_star * cos(lon) * r2_star * cos(lat);
      var y_star = targetR * r1_star * sin(lon) * r2_star * cos(lat);
      var z_star = targetR * r2_star * sin(lat);
      var index = i + j * (total + 1);

      globe[index] = createVector(x_star, y_star, z_star);
    }
  }

  //offset += 5;//about color
  var star2Dpoints = [];
  for (var i = 0; i < total; i++) {
    // var h = map(i, 0, total, 0, 255 * 6);
    // fill((h + offset) % 255, 255, 255);

    for (var j = 0; j < total + 1; j++) {
      var index1 = i + j * (total + 1);
      var v1 = globe[index1];

      push();
      translate(v1.x, v1.y, 0);
      //sphere(1);
      cone(2);
      pop();

    }
  }

}

function star3D() {
  //background star
  m = 5;
  var r_star = 150;
  for (var i = 0; i < total + 1; i++) {
    var lat = map(i, 0, total, -PI / 2, PI / 2);
    var r2_star = supershape(lat, m, 0.2, 1.7, 1.7);

    for (var j = 0; j < total + 1; j++) {
      var lon = map(j, 0, total, -PI, PI);
      var r1_star = supershape(lon, m, 0.2, 1.7, 1.7);

      var x_star = targetR * r1_star * cos(lon) * r2_star * cos(lat);
      var y_star = targetR * r1_star * sin(lon) * r2_star * cos(lat);
      var z_star = targetR * r2_star * sin(lat);
      var index = i + j * (total + 1);

      globe[index] = createVector(x_star, y_star, z_star);
    }
  }

  //offset += 5;//about color
  var star3Dpoints = [];
  for (var i = 0; i < total; i++) {
    // var h = map(i, 0, total, 0, 255 * 6);
    // fill((h + offset) % 255, 255, 255);
    for (var j = 0; j < total + 1; j++) {
      var index1 = i + j * (total + 1);
      var v1 = globe[index1];

      //star3Dpoints.push([v1.x, v1.y, v1.z]);
      push();
      translate(v1.x, v1.y, v1.z);
      //sphere(1);
      cone(1);
      pop();
    }
  }
}

function starChange() {
  var r_star = 150;
  for (var i = 0; i < total + 1; i++) {
    var lat = map(i, 0, total, -PI / 2, PI / 2);
    var r2_star = supershape(lat, mchange, 0.2, 1.7, 1.7);

    for (var j = 0; j < total + 1; j++) {
      var lon = map(j, 0, total, -PI, PI);
      var r1_star = supershape(lon, mchange, 0.2, 1.7, 1.7);

      var x_star = targetR * r1_star * cos(lon) * r2_star * cos(lat);
      var y_star = targetR * r1_star * sin(lon) * r2_star * cos(lat);
      var z_star = targetR * r2_star * sin(lat);
      var index = i + j * (total + 1);

      globe[index] = createVector(x_star, y_star, z_star);
    }
  }

  for (var i = 0; i < total; i++) {
    for (var j = 0; j < total + 1; j++) {
      var index1 = i + j * (total + 1);
      var v1 = globe[index1];
      push();
      translate(v1.x, v1.y, 0);
      var h_2 = map(i, 0, total, 0, 360);
      fill(h_2, 100, 100);
      cone(2);
      pop();
    }
  }
}

function starChange3D() {
  var r_star = 150;
  for (var i = 0; i < total + 1; i++) {
    var lat = map(i, 0, total, -PI / 2, PI / 2);
    var r2_star = supershape(lat, mchange, 0.2, 1.7, 1.7);

    for (var j = 0; j < total + 1; j++) {
      var lon = map(j, 0, total, -PI, PI);
      var r1_star = supershape(lon, mchange, 0.2, 1.7, 1.7);

      var x_star = targetR * r1_star * cos(lon) * r2_star * cos(lat);
      var y_star = targetR * r1_star * sin(lon) * r2_star * cos(lat);
      var z_star = targetR * r2_star * sin(lat);
      var index = i + j * (total + 1);

      globe[index] = createVector(x_star, y_star, z_star);
    }
  }

  //offset += 5;//about color
  for (var i = 0; i < total; i++) {
    // var h = map(i, 0, total, 0, 255 * 6);
    // fill((h + offset) % 255, 255, 255);
    for (var j = 0; j < total + 1; j++) {
      var index1 = i + j * (total + 1);
      var v1 = globe[index1];
      push();
      translate(v1.x, v1.y, v1.z);
      var h_3 = map(i, 0, total, 0, 360);
      fill(h_3, 100, 100);
      cone(1);
      pop();
    }
  }
}

function draw() {
  background(0, 0, 0);
  //console.log((degrees(frameCount / 100) / 360) % 1);


  rotateX(frameCount * 0.003);
  rotateZ(frameCount * 0.002);
  rotateX(frameCount * 0.001);

  //orbitControl();
  // ambientLight(360, 100, 100);


  if (amp > 0.5 && param.addStaticStar) {
    staticStar(-300, 300, 300);
    staticStar(300, -300, 300);
    staticStar(300, 300, -300);
    //staticStar(0, 0, 0);
  }

  if (param.addLine && amp > 0.7) {
    push();
    beginShape();
    stroke(0, 0, 100);
    strokeWeight(10);
    vertex(300, 300, -300);
    vertex(300, -300, 300);
    vertex(-300, 300, 300);
    vertex(300, 300, -300);
    endShape();
    pop();
  }

  if (targetR > r) {
    r += sqrt(targetR - r);
  } else {
    r -= sqrt(r - targetR);
  }


  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    if (param.addColor) {
      p.addColor = true;
    }

    if (param.addShape) {
      p.update();
      p.follow(flowfield);
      p.edges();

      if (param.superShapeShine) {
        p.shine = true;
      }
      p.display(flowfield);

    }

    if (param.addDonut) {
      p.addDonut();
    }

  }


  push();
  translate(-width / 2, -height / 2, 0);

  //navigate
  // var rotY = map(mouseX, 0, width, -PI / 2, PI / 2);
  // rotateY(rotY);
  // var rotX = map(mouseY, 0, height, -PI / 6, PI / 6);
  // rotateX(rotX);

  for (var i = 0; i < boids.length; i++) {
    var b = boids[i];


    if (param.addBoids) {
      b.flock(boids);
      b.flock(particles);

    }

    if (param.shine) {
      b.shine(lightRange, sizeRange);
      b.follow(flowfield);
    } else {
      b.display();
    }

    if (param.addColor) {
      b.addColor = true;
    }

    if (param.drawLines) {
      b.drawLines(boids);
    }

    b.update();
    b.checkEdges();

  }
  pop();

  var percentdone = (degrees(frameCount / 500) / 360);
  if (param.star2D) {
    star2D();
  }
  if (param.star3D) {
    star3D();
  }
  if (param.starChange) {
    starChange();
  }
  if (param.starChange3D) {
    starChange3D();
  }

  fr.html(floor(frameRate()));
}

function fileSelected(e) {
  var file = e.target.files[0];
  fileName = file.name;
  wavesurfer.empty();
  wavesurfer.loadBlob(file);

}

document.getElementById('files').addEventListener('change', fileSelected, false);
document.getElementById('toggle').onclick = function() {
  if (wavesurfer.isPlaying()) {
    wavesurfer.stop();
  } else {
    wavesurfer.play();
  }
}
