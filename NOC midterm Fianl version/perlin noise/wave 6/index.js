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
var scl = 5;
var cols, rows;
var h = 0;
var zoff = 0;
var fr;
var particles = [];
var numParticles = 2000;
var flowfield;


wavesurfer.on('ready', function() {
  wavesurfer.play();
  duration = wavesurfer.getDuration();
  pcm = JSON.parse(wavesurfer.exportPCM(length, 20000, true, 0));

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
    particles.push(new Particle(random(width), random(height)));
    // var particle = new Particle(random(width),random(height));
    // particle.h = i * (255 / numParticles);
    // particles.push(particle);
  }

  background(51);
}

function doThis() {
  // we round to the nearest even number
  if (wavesurfer.isPlaying()) {
    var position = Math.round((wavesurfer.getCurrentTime() / duration) * length * 0.5) * 2;
    var up = pcm[position];
    var down = pcm[position + 1];

    console.log(up, down); // add update field function here

    //for each small grid
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;

        //angle from noise
        noiseDetail(1, 0.2);
        var noiseN = noise(abs(up * down), zoff);
        var distance = dist(x, y, width / 2, height / 2) * 0.3;
        var angle_1 = -(noiseN * distance * PI / 2) - (PI / 2);

        //angle circle
        var angle_2 = atan2(rows / 2 - y, cols / 2 - x) + PI / 2;
        var angle = 0.3 * angle_1 + 0.7 * angle_2;
        // var angle = angle_2; 

        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;

        // //the vectors
        // stroke(0, 50);
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
  background(51, 50);

  for (var a = 0; a < particles.length; a++) {
    particles[a].follow(flowfield);
    particles[a].update();
    particles[a].edges();
    particles[a].display(flowfield);
  }

  fr.html(floor(frameRate()));
}

function fileSelected(e) {
  var file = e.target.files[0];
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