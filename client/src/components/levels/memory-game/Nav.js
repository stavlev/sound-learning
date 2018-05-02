import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Paper, Typography} from 'material-ui';

import * as actions from './actionCreators';

class Nav extends Component {

    constructor() {
        super();
        this.handleClickResetButton = this.handleClickResetButton.bind(this);
    }

    handleClickResetButton(e) {
        ///e.preventDefault();
        setTimeout(() => {
            this.props.startGame();
        }, 100)

    }

    render() {
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
                            Number of tries: <span className="label label-success">{this.props.numberOfTries}</span>
                        </Typography>
                        <br/><br/>
                       <div className="memory-game">
                           <Typography type="display3"
                                    onClick={() => {
                                        this.handleClickResetButton();
                                    }}>
                                Start Game
                        </Typography>
                       </div>
                    </Paper>
                </div>)
    }
}

function mapStateToProps(state) {
    return {
        numberOfTries: state.memoryGame.numberOfTries
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        startGame: actions.startGame,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);
