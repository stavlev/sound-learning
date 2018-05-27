import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {Paper, Typography} from 'material-ui';
import {db} from "../../../firebase/index";

import TilesBoard from "./TilesBoard";
import * as actions from './actionCreators';
export class MemoryGame extends Component {


    nextLevel(){
        const {authUser, onSetdbUser, updateLevels} = this.props;

        db.nextLevel(authUser.uid);
        db.getUser(authUser.uid).then(snapshot =>
            onSetdbUser(snapshot.val()),
        );
        // This is still asynchronious, need to fix if i can
        db.getUser(authUser.uid).then(snapshot =>
            updateLevels(snapshot.val().level, snapshot.val().subLevel + 1),
        );
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
                                                this.props.startGame();
                                            }}>
                                    Start Game
                                </Typography>
                                : (isGameStarted && !isGameFinished) ?
                                <TilesBoard/>
                                :
                                <Typography type="display1" onClick={() => {
                                            this.nextLevel();
                                            }}>
                                    Great! You nailed it :)
                                </Typography>
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
};

function mapStateToProps(state) {
    return {
        isGameStarted: state.memoryGame.isGameStarted,
        isGameFinished: state.memoryGame.isGameFinished,
        numberOfTries: state.memoryGame.numberOfTries,
        authUser: state.sessionState.authUser,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        startGame: actions.startGame,
        onSetdbUser: actions.onSetdbUser,
        updateLevels: actions.updateLevels,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryGame);
