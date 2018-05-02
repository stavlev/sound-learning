import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {Paper, Typography} from 'material-ui';

import TilesBoard from "./TilesBoard";
import * as actions from './actionCreators';

export class MemoryGame extends Component {
    constructor(props) {
        super(props);
        this.handleClickResetButton = this.handleClickResetButton.bind(this);
    }

    handleClickResetButton(e) {
        ///e.preventDefault();
        setTimeout(() => {
            this.props.startGame();
        }, 100)
    }

    render() {
        const {numberOfTries, isGameStarted, isGameFinished} = this.props;

        return (
            <div className="memory-game-container">
                <Paper className="memory-game-paper">
                    <Typography type="display2">
                        Game 3
                    </Typography>
                    <br/>
                    <Typography type="headline">
                        Find all the equal notes!
                    </Typography>
                    <Typography type="title" component="p">
                        Click each tile to play the sound.
                        Click on another tile that you think has the same note.
                    </Typography>
                    <br/>
                    <Typography type="subheading" component="p">
                        Take as much time as you need to distinguish the different frequencies :)
                    </Typography>
                    <br/><br/>
                    <Typography type="subheading" component="p">
                        Number of tries: <span className="label label-success">{numberOfTries}</span>
                    </Typography>
                    <br/><br/>
                    <div className="memory-game">
                        {
                            !isGameStarted ?
                                <Typography type="display3"
                                            onClick={() => {
                                                this.handleClickResetButton();
                                            }}>
                                    Start Game
                                </Typography>
                                : (isGameStarted && !isGameFinished) ?
                                <section>
                                    <MemoryGame/>
                                    <TilesBoard/>
                                </section>
                                :
                                <Typography type="display3">
                                    Great! You nailed it :)
                                </Typography>
                        }
                    </div>
                </Paper>
            </div>)
    }
}

MemoryGame.propTypes = {
    /*tiles: PropTypes.func.array,
    isWaiting: PropTypes.bool,
    audioCtx: PropTypes.object,*/
    isGameStarted: PropTypes.bool,
    isGameFinished: PropTypes.bool,
    numberOfTries: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        isGameStarted: state.memoryGame.isGameStarted,
        isGameFinished: state.memoryGame.isGameFinished,
        numberOfTries: state.memoryGame.numberOfTries
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        startGame: actions.startGame,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryGame);
