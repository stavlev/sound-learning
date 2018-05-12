import React, {Component} from "react";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import _ from "lodash";

import TileComponent from "./TileComponent";
import * as actions from "./actionCreators";
import * as gen from "../../oscillator/oscillatorGenerator";

const randomMaterialColor = require('random-material-color');

export class TilesBoard extends Component {
    constructor(props) {
        super(props);
        this.renderTiles = this.renderTiles.bind(this);
        this.onHandleClickTile = this.onHandleClickTile.bind(this);
    }

    componentDidUpdate() {
        const {tiles, toggleIsWaiting, matchCheck, incrementTries, isWaiting} = this.props;

        const flippedTiles = _.filter(tiles, _.matches({'flipped': true, 'matched': false}));

        if (flippedTiles.length >= 2) {
            toggleIsWaiting(true);

            // try to fix componentDidUpdate called twice
            // because actions are wrapped inside if statement
            if (isWaiting) {
                incrementTries();
                setTimeout(() => {
                    matchCheck(flippedTiles);
                }, 500);
            }
        }
    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    getSample(url, cb) {

        const {audioCtx} = this.props;
        var request = new XMLHttpRequest()
        request.open('GET', url)
        request.responseType = 'arraybuffer'
        request.onload = function() {
            audioCtx.decodeAudioData(request.response, cb)
        }
        request.send()
    }

    async onHandleClickTile(tile, index) {
        const {flipTile, isWaiting, audioCtx} = this.props;

        if (isWaiting) return;

        flipTile(index, tile);

        //tile.node.connect(gainNode);
        //tile.node.connect(audioCtx.destination);
        //gainNode.connect(audioCtx.destination);
        //tile.node.start();
        //tile.node.stop(audioCtx.currentTime + 0.5 );
        //this.sleep(1000);
        //tile.node.disconnect(audioCtx.destination);
        //gainNode.disconnect(audioCtx.destination);
        //tile.node.disconnect(gainNode);

        /*var oscillator = audioCtx.createOscillator();

        //oscillator.type = 'custom';
        oscillator.frequency.setValueAtTime(tile.multiplier * 100 + 140, audioCtx.currentTime); // value in hertz
        //oscillator.frequency.linearRampToValueAtTime(tile.multiplier * 100 - 130, audioCtx.currentTime + 0.5);

        var gainNodeTemp = audioCtx.createGain();
        gainNodeTemp.gain.value = 1;





        var real = new Float32Array([0,0.4,0.7,1,1,0.2,0.2,0.5,0.6,0.5,0.7,0.4]);

        var imag = new Float32Array(real.length);
        var hornTable = audioCtx.createPeriodicWave(real, imag);

        var convolver = audioCtx.createConvolver(); //Create convolver node
        var buffer = audioCtx.createBufferSource(); //Create buffer source

        this.getSample('https://firebasestorage.googleapis.com/v0/b/musiclingo-8a4a1.appspot.com/o/Greek%207%20Echo%20Hall.wav?alt=media&token=8fc61182-2fd9-4cbd-9be2-78d66dc35807', function(impulse) {
            convolver.buffer = impulse;

        });

        oscillator.setPeriodicWave(hornTable);

        oscillator.connect(gainNodeTemp);
        gainNodeTemp.connect(convolver);
        convolver.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1);*/

        gen.oscillatorGenerator(audioCtx, tile.multiplier * 100 + 140, 0, '', 0, 0, '');
    }

    renderTiles() {
        const {tiles} = this.props;
        const randomTileColor = randomMaterialColor.getColor();

        return tiles.map((tile, i) => {
            return (
                <TileComponent tile={tile} key={i} index={i} color={randomTileColor} onClickTile={this.onHandleClickTile}/>
            );
        });
    }

    render() {
        return (
            <div className="memory-component-list">
                {this.renderTiles()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tiles: state.memoryGame.tiles,
        isWaiting: state.memoryGame.isWaiting,
        audioCtx: state.memoryGame.audioCtx,
        //gainNode: state.memoryGame.gainNode
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleIsWaiting: actions.toggleIsWaiting,
        incrementTries: actions.incrementTries,
        matchCheck: actions.matchCheck,
        flipTile: actions.flipTile
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TilesBoard);