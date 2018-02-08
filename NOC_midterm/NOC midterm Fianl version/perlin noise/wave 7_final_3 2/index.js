var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple'
});
var length = 2048; //the length of the arrar
var pcm = []; //the array 
var duration = 0;
var instigated = false;

//for the canvas

var inc = 0.1;
var scl = 20;
var cols, rows;
var h = 0;
var zoff = 0;
var fr;
var particles = [];
var particles_2 = [];
var particles_3 = [];
var numParticles = 500;
var flowfield;
var amp;

//var waves = [];

wavesurfer.on('ready', function() {
  wavesurfer.play();
  duration = wavesurfer.getDuration();
  pcm = JSON.parse(wavesurfer.exportPCM(length, 20000, true, 0));

  //console.log(curren)

  var scale = (duration * 1000) / length * 2;
  if (!instigated) {
    setTimeout(doThis, scale);
  }
  instigated = true;
});


function setup() {
  //pixelDensity(1);
  createCanvas(1000, 500);
  colorMode(HSB, 255);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < numParticles; i++) {
    var particle = new Particle(sin(i * (TWO_PI / numParticles)) * 50 + width / 2, 50 * cos(i * (TWO_PI / numParticles)) + height / 2);
    particle.h = i * (255 / numParticles);
    particles.push(particle);
  }

  for (var j = 0; j < numParticles; j++) {
    var particle_2 = new Particle(sin(j * (TWO_PI / numParticles)) * 100 + width / 2, 100 * cos(j * (TWO_PI / numParticles)) + height / 2);
    particle_2.h = j * (255 / numParticles);
    particles_2.push(particle_2);
  }

  for (var l = 0; l < numParticles; l++) {
    var particle_3 = new Particle(sin(l * (TWO_PI / numParticles)) * 150 + width / 2, 150 * cos(l * (TWO_PI / numParticles)) + height / 2);
    particle_3.h = l * (255 / numParticles);
    particles_3.push(particle_3);
  }

  // for (var i = 0; i < 3; i++) {
  //   waves.push(new Wave((i + 1) * 50));
  // }

  background(51);

}

function doThis() {
  // we round to the nearest even number
  if (wavesurfer.isPlaying()) {
    var position = Math.round((wavesurfer.getCurrentTime() / duration) * length * 0.5) * 2;
    var up = pcm[position];
    var down = pcm[position + 1];

    console.log(up, down); // add update field function here


    amp = abs(up) + abs(down);

    //for each small grid
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;


        //angle from noise;
        noiseDetail(1, 0.2);
        var noiseN = noise(up * down, zoff);
        var distance = dist(x, y, cols / 2, rows / 2);
        var angle_1 = -(noiseN * distance * PI / 2) - (PI / 2);
        var sign;
        if (up + down < 0) {
          sign = -1;
        } else {
          sign = 1;
        }

        //angle circle
        // var angle_2 = atan2(rows / 2 - y, cols / 2 - x) + PI / 2;
        // var angle = 0.3 * angle_1 + 0.7 * angle_2;
        angle_2 = atan2(rows / 2 - y, cols / 2 - x) + PI + PI / 2;
        var angle = 0.3 * angle_1 + 0.7 * angle_2;

        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;

        // stroke(255, 50);
        // push();
        // translate(x * scl, y * scl);
        // rotate(v.heading());
        // strokeWeight(1);
        // stroke(this.h, 255);
        // line(0, 0, scl, 0);
        // pop();

      }
      yoff += inc;
      zoff += 0.003;
    }

    var scale = (duration * 1000) / length * 2;
    setTimeout(doThis, scale);
  }

}

function draw() {
  background(75, 50);


  for (var a = 0; a < particles.length; a++) {
    particles[a].follow(flowfield);
    particles[a].update();
    particles[a].edges();
    particles[a].display(flowfield);
  }

  for (var b = 0; b < particles_2.length; b++) {
    particles_2[b].follow(flowfield);
    particles_2[b].update();
    particles_2[b].edges();
    particles_2[b].display(flowfield);
  }

  for (var c = 0; c < particles_3.length; c++) {
    particles_3[c].follow(flowfield);
    particles_3[c].update();
    particles_3[c].edges();
    particles_3[c].display(flowfield);
  }

  // for (var a = 0; a < waves.length; a++) {
  //   var w = waves[a];

  //   w.follow(flowfield);
  //   w.update();
  //   w.edges();

  //   w.display(flowfield);
  // }

  for (var i = 0; i < 50; i++) {

    var freq = frameCount * 0.003;
    var sinVal = sin(freq + i * 10) * amp * 500;
    var cosVal = cos(freq + i * 10) * amp * 500;
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(255);
    ellipse(sinVal, cosVal, random(5), random(5));
    pop();

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