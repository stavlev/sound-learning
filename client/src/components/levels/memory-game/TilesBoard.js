import React, {Component} from "react";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import _ from "lodash";

import TileComponent from "./TileComponent";
import * as actions from "./actionCreators";
import * as gen from "../../oscillator/oscillatorGenerator";
import * as cache from "../../oscillator/impulseCache";
import {detectLevel} from "../../../helper_functions/levelDetector";

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
        const {flipTile, isWaiting, audioCtx, match} = this.props;

        if (isWaiting) return;

        flipTile(index, tile);

        let level = detectLevel(match.url);

        switch(level[0]){
            case 1: {
                gen.oscillatorGenerator(audioCtx, tile.multiplier * 100 + 140, 0, '', 0, 0, 0);
                break;
            }
            case 2: {
                gen.oscillatorGenerator(audioCtx, 0, 0.2 * tile.multiplier, '', 0, 0, 0);
                break;
            }
            case 3: {
                gen.oscillatorGenerator(audioCtx, 0, 0, '', 0, 0, tile.multiplier);
                break;
            }
            case 4: {
                gen.oscillatorGenerator(audioCtx, 0, 0, '', tile.multiplier * 100 + 100, 1, 0);
                break;
            }
            case 5: {
                switch(tile.multiplier){
                    case 1: {
                        gen.oscillatorGenerator(audioCtx, 0, 0, 'sine', 0, 0, 0);
                        break;
                    }
                    case 2: {
                        gen.oscillatorGenerator(audioCtx, 0, 0, 'square', 0, 0, 0);
                        break;
                    }
                    case 3: {
                        gen.oscillatorGenerator(audioCtx, 0, 0, 'sawtooth', 0, 0, 0);
                        break;
                    }
                    case 4: {
                        gen.oscillatorGenerator(audioCtx, 0, 0, 'triangle', 0, 0, 0);
                        break;
                    }
                }
                break;
            }
        }

        //gen.oscillatorGenerator(audioCtx, tile.multiplier * 100 + 140, 0, '', 0, 0, 0);
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

export default compose(withRouter,connect(mapStateToProps, mapDispatchToProps))(TilesBoard);