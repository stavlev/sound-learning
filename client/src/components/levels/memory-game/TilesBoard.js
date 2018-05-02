import React, {Component} from "react";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import _ from "lodash";

import Tile from "./Tile";
import * as actions from "./actionCreators";

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

    async onHandleClickTile(tile, index) {
        const {flipTile, isWaiting, audioCtx} = this.props;

        if (isWaiting) return;

        flipTile(index, tile);

        tile.node.connect(audioCtx.destination);
        this.sleep(500);
        tile.node.disconnect(audioCtx.destination);
    }

    renderTiles() {
        const {tiles} = this.props;

        return tiles.map((tile, i) => {
            return (
                <Tile tile={tile} key={i} index={i} onClickTile={this.onHandleClickTile}/>
            );
        });
    }

    render() {
        return (
            <div className="container gameboard">
                <div className="row">
                    {this.renderTiles()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tiles: state.memoryGame.tiles,
        isWaiting: state.memoryGame.isWaiting,
        audioCtx: state.memoryGame.audioCtx
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