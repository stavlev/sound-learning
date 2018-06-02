import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {Paper, Typography} from 'material-ui';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import TilesBoard from "./TilesBoard";
import * as actions from './actionCreators';
import {detectLevel, getNextLevelRoute, nextLevel} from '../../../helper_functions/levelDetector';

export class MemoryGame extends Component {
    render() {
        const {numberOfTries, isGameStarted, isGameFinished, match,
            authUser, onSetdbUser, updateLevels} = this.props;

        let nextLevelRoute = getNextLevelRoute(match.url);
        let nextLevelSubLevelNum = detectLevel(match.url);
        let numOfTiles = 0;

        switch (nextLevelSubLevelNum[0]){
            case 1: {
                numOfTiles = 8;
                break;
            }
            case 2: {
                numOfTiles = 6;
                break;
            }
            case 3: {
                numOfTiles = 4;
                break;
            }
            case 4: {
                numOfTiles = 8;
                break;
            }
            case 5: {
                numOfTiles = 4;
                break;
            }
        }


        return (
            <div className="memory-game-container">
                <Paper className="memory-game-paper">
                    <Typography type="display2">
                        Memory Game
                    </Typography>
                    <br/>
                    <Typography type="headline">
                        Find all the equal frequencies!
                    </Typography>
                    <Typography type="title" component="p">
                        Click each tile to play the sound.
                        Click on another tile that you think has the same frequency.
                    </Typography>
                    <br/>
                    <Typography type="subheading" component="p">
                        Take as much time as you need to match the different frequencies :)
                    </Typography>
                    <br/><br/>
                    <Typography type="subheading" component="p">
                        Number of tries: <span className="label label-success">{numberOfTries}</span>
                    </Typography>
                    <br/><br/>
                    <div className="memory-game">
                        {
                            !isGameStarted ?
                                <Typography type="display1"
                                            onClick={() => {
                                                this.props.startGame(numOfTiles);
                                            }}>
                                    Start Game
                                </Typography>
                                : (isGameStarted && !isGameFinished) ?
                                <TilesBoard/>
                                :
                                <div>
                                    <Typography type="display1">
                                        Great! You nailed it!
                                    </Typography>
                                    <br />
                                    <Typography type="title"
                                                onClick={() => nextLevel(authUser, onSetdbUser, updateLevels, match)}
                                                component={Link}
                                                to={nextLevelRoute}
                                    >
                                        <b>Next Level</b>
                                    </Typography>
                                </div>
                        }
                    </div>
                </Paper>
            </div>)
    }
}

MemoryGame.propTypes = {
    isGameStarted: PropTypes.bool,
    isGameFinished: PropTypes.bool,
    numberOfTries: PropTypes.number,
    authUser: PropTypes.object
};

function mapStateToProps(state) {
    return {
        isGameStarted: state.memoryGame.isGameStarted,
        isGameFinished: state.memoryGame.isGameFinished,
        numberOfTries: state.memoryGame.numberOfTries,
        authUser: state.sessionState.authUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        startGame: actions.startGame,
        onSetdbUser: actions.onSetdbUser,
        updateLevels: actions.updateLevels,
    }, dispatch);
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(MemoryGame);
