var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple'
});
var length = 2048; //the length of the arrar
var pcm = []; //the array 
var duration = 0;
var instigated = false;


//for the dat.gui
var param = {
  colors: 20,
  numParticles: 1000,
  soundMultiplier: 2,
  angleRange: 1 / 2,
  debug : false
};

var gui = new dat.gui.GUI({
  autoPlace: false
});
var customContainer = document.getElementById("container");
customContainer.appendChild(gui.domElement);

gui.add(param, 'colors', 1, 20, 1); //start,end,step;
gui.add(param, 'numParticles', 200, 1500, 2);
gui.add(param, 'soundMultiplier', 1, 10, 1);
gui.add(param, 'angleRange', 1 / 2, 8, 0.2);
gui.add(param, 'debug', 1 / 2, 8, 0.2);



//for the canvas

var inc = 0.1;
var scl = 50;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
var colorCutoff = [];




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

  for (var colori = 0; colori < param.colors; colori++) {
    for (var i = 0; i < param.numParticles / param.colors; i++) {
      var particle = new Particle(random(width / param.colors * colori, width / param.colors * colori + width / param.colors), height - 3);
      particle.h = colori * 255 / param.colors;
      particles.push(particle);
    }
  }



  background(51);
}

function doThis() {
  // we round to the nearest even number
  if (wavesurfer.isPlaying()) {
    var position = Math.round((wavesurfer.getCurrentTime() / duration) * length) * 2;
    var up = pcm[position];
    var down = pcm[position + 1];

    console.log(up, down); // add update field function here

    //for each small grid
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;

        var noiseN = noise(up * down + yoff * cols + xoff, zoff) * PI - PI / 2;
        var distance = dist(x, y, x, rows) / rows;
        var angle = -(noiseN * distance * param.angleRange * PI) - (PI / 2);

        colorCutoff = [];
        for (var i = 0; i < param.colors; i++) {
          colorCutoff.push(height - height * param.soundMultiplier * (up - down) * abs(sin(i + ((up - down) * 10) + 1)));
        }

        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;

        //draw the vectors, show the flow field
        /*
        stroke(0);
        push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        strokeWeight(1);
        line(0, 0, scl, 0);
        pop();
        */
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
    particles[a].display(flowfield);


    if (particles[a].edges(colorCutoff[Math.floor(particles[a].h * param.colors / 255)])) {
      particles.splice(a, 1);

    }
  }

  if (param.debug) {

    for (var i = 0; i < colorCutoff.length; i++) {
      stroke(this.h, 200, 255);
      // this.h = this.h + 1;
      // if (this.h > 255) {
      //   this.h = 0;
      // }
      strokeWeight(2);
      //point(this.pos.x,this.pos.y);
      line(0, colorCutoff[i], width, colorCutoff[i]);
    }
  }

  if (pcm.length != 0 && particles.length < param.numParticles * 2) {
    for (var colori = 0; colori < param.colors; colori++) {
      for (var i = 0; i < random(0, 100) / param.colors; i++) {
        var particle = new Particle(random(width / param.colors * colori, width / param.colors * colori + width / param.colors), height - 1);
        particle.h = colori * 255 / param.colors;
        particles.push(particle);


      }
    }
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
    setTimeout(doThis, scale);
    wavesurfer.play();
  }
}