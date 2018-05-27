import * as imp from "../../constants/impulses"

let impulse1 = '';
let impulse2 = '';
let impulse3 = '';
let impulse4 = '';

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

export function updateImpulseCache(){

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    getSample(audioCtx, imp.GREEK , function(impulse) {
        impulse1 = impulse;
    });

    getSample(audioCtx, imp.CHATEAU , function(impulse) {
        impulse2 = impulse;
    });

    getSample(audioCtx, imp.STAR , function(impulse) {
        impulse3 = impulse;
    });

    getSample(audioCtx, imp.PARKING_GARAGE , function(impulse) {
        impulse4 = impulse;
    });
}

export function getImpulse(index){

    let impulse;

    switch(index){
        case (1):{
            impulse = impulse1;
            break;
        }
        case (2):{
            impulse = impulse2;
            break;
        }
        case (3):{
            impulse = impulse3;
            break;
        }
        case (4):{
            impulse = impulse4;
            break;
        }
        default:{
            impulse = impulse1;
            break;
        }
    }

    return impulse;
}