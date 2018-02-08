var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple'
});
var length = 2048; //the length of the arrar
var pcm = []; //the array 
var duration = 0;
var instigated = false;

//for movment

var gui = new dat.gui.GUI({
  autoPlace: false
});
var customContainer_1 = document.getElementById('gui-container-1');
customContainer_1.appendChild(gui.domElement);

var param = {
  addWave: function() {
    waves.push(new Wave(height / 2, 15, 2));
  },
  scl: 20,
  NoiseDetail: 0.2,
  showFlowField: false,
  HideParticles: false
};

gui.add(param, 'addWave');
gui.add(param, 'NoiseDetail', 0.05, 0.5, 0.02);
gui.add(param, 'showFlowField');
gui.add(param, 'HideParticles');


//for the background
var bgColor = new dat.gui.GUI({
  autoPlace: false
});
var customContainer_2 = document.getElementById('gui-container-2');
customContainer_2.appendChild(bgColor.domElement);

var param_bg = {
  h: 360,
  s: 100,
  b: 0,
  a: 50,
  CHANGE: function() {
    param_bg.b = 100;
  },
  scheme_1: function() {
    param_bg.h = 347;
    param_bg.s = 23;
    param_bg.b = 100;
    param_bg.a = 50;
  },
  scheme_2: function() {
    param_bg.h = 238;
    param_bg.s = 11;
    param_bg.b = 76;
    param_bg.a = 50;
  },
  scheme_3: function() {
    param_bg.h = 38;
    param_bg.s = 37;
    param_bg.b = 100;
    param_bg.a = 50;
  },
  scheme_4: function() {
    param_bg.h = 175;
    param_bg.s = 25;
    param_bg.b = 93;
    param_bg.a = 50;
  }
}

bgColor.add(param_bg, "h", 0, 360, 2);
bgColor.add(param_bg, "s", 0, 100, 1);
bgColor.add(param_bg, "b", 0, 100, 1);
bgColor.add(param_bg, "a", 0, 100, 1);
bgColor.add(param_bg, "scheme_1");
bgColor.add(param_bg, "scheme_2");
bgColor.add(param_bg, "scheme_3");
bgColor.add(param_bg, "scheme_4");


//for the wave
var wvColor = new dat.gui.GUI({
  autoPlace: false
});
var customContainer_3 = document.getElementById('gui-container-3');
customContainer_3.appendChild(wvColor.domElement);

var param_wv = {
  h: 15,
  l: 2,
  s: 100,
  b: 80,
  SET: function() {
    waves = [];
    for (var i = 0; i < 3; i++) {
      waves.push(new Wave(height / 2 + 30 * i, i * 15 + param_wv.h, param_wv.l, param_wv.s, param_wv.b));
    }
  },
  scheme_1: function() {
    param_wv.h = 176;
    param_wv.l = 0;
    param_wv.s = 97;
    param_wv.b = 70;
    param_wv.SET();
  },
  scheme_2: function() {
    param_wv.h = 44;
    param_wv.l = 0;
    param_wv.s = 90;
    param_wv.b = 80;
    param_wv.SET();
  },
  scheme_3: function() {
    param_wv.h = 354;
    param_wv.l = 0;
    param_wv.s = 59;
    param_wv.b = 100;
    param_wv.SET();
  },
  scheme_4: function() {
    param_wv.h = 284;
    param_wv.l = 0;
    param_wv.s = 59;
    param_wv.b = 75;
    param_wv.SET();
  }
};

wvColor.add(param_wv, "h", 0, 360, 2);
wvColor.add(param_wv, "l", 0, 4, 0.2);
wvColor.add(param_wv, "s", 0, 100, 1);
wvColor.add(param_wv, "b", 0, 100, 1);
wvColor.add(param_wv, 'SET');
wvColor.add(param_wv, 'scheme_1');
wvColor.add(param_wv, 'scheme_2');
wvColor.add(param_wv, 'scheme_3');
wvColor.add(param_wv, 'scheme_4');





//for the canvas

var inc = 0.1;
var cols, rows;
var zoff = 0;
var fr;
var waves = [];
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
  createCanvas(1000, 650);
  colorMode(HSB, 360, 100, 100, 100);

  cols = floor(width / param.scl);
  rows = floor(height / param.scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 3; i++) {
    waves.push(new Wave(height / 2 + 30 * i, param_wv.h + i * 15, param_wv.l, param_wv.s, param_wv.b));
  }

}

function doThis() {
  // we round to the nearest even number
  if (wavesurfer.isPlaying()) {
    var position = Math.round((wavesurfer.getCurrentTime() / duration) * length * 0.5) * 2;
    var up = pcm[position];
    var down = pcm[position + 1];

    console.log(up, down); 

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
        
        
        if (param.showFlowField) {
          
          push();
          translate(x * param.scl, y * param.scl);
          rotate(v.heading());
          strokeWeight(1);
          stroke(0,0,100);
          line(0, 0, param.scl, 0);
          pop();
        }
      }
      yoff += inc;
      zoff += 0.003;

    }

    var scale = (duration * 1000) / length * 2;
    setTimeout(doThis, scale);
  }



}

function draw() {
  background(param_bg.h, param_bg.s, param_bg.b, param_bg.a);

  // translate(width / 2, height / 2);
  // rotate(frameCount * 0.005);

  for (var i = 0; i < waves.length; i++) {
    var w = waves[i];

    w.update();
    w.follow(flowfield);
    w.edges();
    if (!param.HideParticles) {
      w.display(flowfield);
    }
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