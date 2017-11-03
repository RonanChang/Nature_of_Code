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
var amp;
var fr;
var num = 20;
var step, sz, offSet, theta;

//for dat.gui
gui = new dat.gui.GUI({autoPlace:false});
var container = document.getElementById('container');
container.appendChild(gui.domElement);

var param = {
    h : 255,
    s : 0,
    b :255,
    changeColor : false ,
    step:10
};

gui.add(param,'step',0,36,1);

gui.add(param,'changeColor');




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
  var canvas = createCanvas(windowWidth,windowHeight);
    canvas.parent('canvas');
  strokeWeight(5);
  step = 22;
  theta = 0;

  fr = createP('');
}

function doThis() {
  // we round to the nearest even number
  if (wavesurfer.isPlaying()) {
    var position = Math.round((wavesurfer.getCurrentTime() / duration) * length) * 2;
    var up = pcm[position];
    var down = pcm[position + 1];

    //console.log(up, down);
    amp = up - down;

    colorMode(RGB);
    background(60,63,65);
    translate(width / 2, height / 2);

    for (var i = 0; i < num; i++) {
        
      colorMode(HSB);
      
      var h = 255 - param.step*i;     
    if(h<0){
            h+=255;
        }
        
    if(param.changeColor){
      stroke(h,255,255);}
      else{
          stroke(255,0,255);
      }
      noFill();
      sz = i * step;
      var offSet = TWO_PI / num * i;
      var arcEnd = map(sin(theta + offSet) * (amp + 1), -3, 3, 2*PI/3, TWO_PI);
      arc(0, 0, sz, sz, PI, arcEnd);
    }
    resetMatrix();
    theta += amp *0.5 ;
    //console.log(theta);

    fr.html(floor(frameRate()));

    var scale = (duration * 1000) / length * 0.5;
    setTimeout(doThis, scale);
  }
}


function draw() {

  // background(20);
  // translate(width / 2, height / 2);


  // for (var i = 0; i < num; i++) {
  //   stroke(255);
  //   noFill();
  //   sz = i * step;
  //   var offSet = TWO_PI / num * i;
  //   var arcEnd = map(sin(theta + offSet) * (amp + 1), -3, 3, 0, TWO_PI);
  //   arc(0, 0, sz, sz, PI, arcEnd);
  //   ellipse(0, 0, 36, 36);
  // }
  // theta += amp * 0.03;

  // fr.html(floor(frameRate()));
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