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
var count = 19;
var r = 240;
var d = 8.25;
var MAX = 330;
var amp;
var fr;


wavesurfer.on('ready', function() {
  wavesurfer.play();
  duration = wavesurfer.getDuration();
  pcm = JSON.parse(wavesurfer.exportPCM(length, 20000, true, 0));

  var scale = (duration * 1000) / length * 0.5;
  if (!instigated) {
    setTimeout(doThis, scale);
  }
  instigated = true;
});

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');
  smooth();
  ellipseMode(RADIUS);
  noStroke();
  fr = createP('');
}

function doThis() {
  // we round to the nearest even number
  if (wavesurfer.isPlaying()) {
    var position = Math.round((wavesurfer.getCurrentTime() / duration) * length ) * 2;
    var up = pcm[position];
    var down = pcm[position + 1];

    //console.log(up, down); 
    amp = up - down;

    background(60,63,65);
    fill(255);
    push();
    translate(width / 2, height / 2);
    rotate(frameCount*0.001);
    for (var n = 1; n < count; n++) {
      for (var a = 0; a <= 360; a += 1) {
        var progress = constrain(map(frameCount % MAX, 0 + n * d, MAX + (n - count) * d, 0, 1), 0, 1);
        var ease = -0.5 * (cos(progress * PI) - 1);
        var phase = 0 + 2 * PI * ease + PI + radians(map(frameCount % MAX, 0, MAX, 0, 360));
        var x = map(a, 0, 360, -r, r);
        var y = amp * r * sqrt(1 - pow(x / r, 2)) * sin(radians(a) + phase);
        ellipse(x, y, 1, 1);
      }
    }
    pop();
    fr.html(floor(frameRate()));

    var scale = (duration * 1000) / length * 0.3 ;
    setTimeout(doThis, scale);
  }
}


// function draw() {
//   background(0);
//   fill(255);
//   push();
//   translate(width / 2, height / 2);
//   for (var n = 1; n < count; n++) {
//     for (var a = 0; a <= 360; a += 1) {
//       var progress = constrain(map(frameCount % MAX, 0 + n * d, MAX + (n - count) * d, 0, 1), 0, 1);
//       var ease = -0.5 * (cos(progress * PI) - 1);
//       var phase = 0 + 2 * PI * ease + PI + radians(map(frameCount % MAX, 0, MAX, 0, 360));
//       var x = map(a, 0, 360, -r, r);
//       var y = amp * r * sqrt(1 - pow(x / r, 2)) * sin(radians(a) + phase);
//       ellipse(x, y, 1, 1);
//     }
//   }
//   pop();
//   fr.html(floor(frameRate()));
// }

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