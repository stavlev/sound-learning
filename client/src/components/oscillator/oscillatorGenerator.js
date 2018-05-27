import * as cache from "./impulseCache"

function getSample(audioCtx, url, cb) {

    //const {audioCtx} = audioCtx;
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.responseType = 'arraybuffer'
    request.onload = function() {
        audioCtx.decodeAudioData(request.response, cb)
    }
    request.send()
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}



export function oscillatorGenerator(audioCtx, frequency, loudness, waveShape, wavefreq, wavetime, convolverURL) {

    let oscillator = audioCtx.createOscillator();
    let gainNode = null;
    let convolver = null;
    let buffer = null;

    let isLoudness = 0;
    let isConvolver = 0;

    if (frequency === 0) {
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    }
    else {
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    }

    if (loudness !== 0) {
        gainNode = audioCtx.createGain();
        gainNode.gain.value = loudness;
        isLoudness = 1;
    }

    if (waveShape === '') {
        oscillator.type = 'sine';
    }
    else {
        oscillator.type = waveShape;
    }

    if (wavefreq !== 0) {
        oscillator.frequency.linearRampToValueAtTime(wavefreq, audioCtx.currentTime + wavetime);
    }

    if (convolverURL !== 0) {

        convolver = audioCtx.createConvolver();
        buffer = audioCtx.createBufferSource();
        convolver.buffer = cache.getImpulse(convolverURL);
        isConvolver = 1;
    }

    if (isLoudness === 1){
        oscillator.connect(gainNode);

        if (isConvolver === 1){
            gainNode.connect(convolver);

            convolver.connect(audioCtx.destination);
        }
        else{
            gainNode.connect(audioCtx.destination);
        }
    }
    else{

        if (isConvolver === 1){
            oscillator.connect(convolver);
            convolver.connect(audioCtx.destination);
        }
        else{
            oscillator.connect(audioCtx.destination);
        }
    }

    oscillator.start();

    oscillator.stop(audioCtx.currentTime + wavetime + 1);

    sleep((wavetime + 1)*1000)

    if (convolver !== null){
        convolver.disconnect(audioCtx.destination);
        if (gainNode !== null){
            gainNode.disconnect(convolver);
            oscillator.disconnect(gainNode);
        }
        else {
            oscillator.disconnect(convolver);
        }
    }
    else if (gainNode !== null){
        gainNode.disconnect(audioCtx.destination);
        oscillator.disconnect(gainNode);
    }
    else{
        oscillator.disconnect(audioCtx.destination);
    }

    oscillator = null;
    gainNode = null;
    convolver = null;
    buffer = null;
}