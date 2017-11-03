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

var colors;
var type;



wavesurfer.on('ready', function () {
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
    colors = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255)
  ];

    type = 0;

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


        blendMode(BLEND);

        if (type == 0) {
            background(238);
            blendMode(EXCLUSION);
        } else {
            background(60, 63, 65);
            blendMode(SCREEN);
        }
        noFill();
        strokeWeight(20);
        for (var i = 0; i < 3; i++) {
            stroke(colors[i]);
            beginShape();
            for (var w = -20; w < width + 20; w += 5) {
                var h = height / 2;
                h += amp * 120 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.003 + frameCount * 0.02)), 5);
                curveVertex(w, h);
            }
            endShape();
        }


        fr.html(floor(frameRate()));

        var scale = (duration * 1000) / length * 0.5;
        setTimeout(doThis, scale);
    }
}


function mousePressed() {
    if (type == 0) {
        type = 1;
    } else {
        type = 0;
    }
}


function fileSelected(e) {
    var file = e.target.files[0];
    wavesurfer.empty();
    wavesurfer.loadBlob(file);
}

document.getElementById('files').addEventListener('change', fileSelected, false);

document.getElementById('toggle').onclick = function () {
    if (wavesurfer.isPlaying()) {
        wavesurfer.stop();
    } else {
        wavesurfer.play();
    }
}
