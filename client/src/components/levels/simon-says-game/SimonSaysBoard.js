import React, {Component} from 'react';
import {Flex} from 'reflexbox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Game from './SimonSaysGame';
import Score from './ScoreComponent';
import Pads from './PadsComponent';
import SimonSaysShell from './SimonSaysShell';
import SimonSaysPlayer from './SimonSaysPlayer';
import CenterOverlay from './CenterOverlayComponent';
import GrayScale from './GrayScaleComponent';
import {Button} from './ButtonsComponent';
import {actionCreators} from './actionCreators';
import {SONG_DELAY_TIME, NEXT_LEVEL_DELAY_TIME} from '../../../constants/simonSaysParams';
import sleep from '../../../utils/sleep';

export class SimonSaysBoard extends Component {

    componentDidMount() {
        this.startMatch();
    }

    startMatch() {
        const {actions} = this.props;
        actions.startGame();
        sleep(SONG_DELAY_TIME).then(() => actions.sing());
    }

    onPadClick({id}) {
        const {actions, game, match} = this.props;
        const tail = match.guessed.length;
        const succeeded = match.all[tail] === id;

        if (!game.gameOver) {
            actions.guess({id, succeeded})
                .then(async ({done}) => {
                    if (done) {
                        actions.nextLevel();
                        await sleep(NEXT_LEVEL_DELAY_TIME);
                        actions.sing();
                    }
                });
        }
    }

    render() {
        const {singing, score, gameOver, highscore} = this.props.game;
        return (
            <SimonSaysShell>
                {gameOver &&
                <CenterOverlay p={2}>
                    <h2>SCORE {score}</h2>
                    <h3>HIGH SCORE {highscore}</h3>
                    <Button onClick={this.startMatch.bind(this)}>Try again</Button>
                </CenterOverlay>
                }
                <GrayScale disabled={!gameOver}>
                    <Game disbledPointer={(singing || gameOver)}>
                        <Flex
                            align="center"
                            justify="center"
                        >
                            {this.props.pads.slice(0, 2).map((pad, i) => (
                                <Pads key={i} pad={pad} onClick={_ => this.onPadClick({id: pad.id})}/>
                            ))}
                        </Flex>
                        <Score length={score.toString().length}>{score}</Score>
                        <Flex
                            align="center"
                            justify="center"
                        >
                            {this.props.pads.slice(2, 4).map((pad, i) => (
                                <Pads key={i} pad={pad} onClick={_ => this.onPadClick({id: pad.id})}/>
                            ))}
                        </Flex>
                    </Game>
                </GrayScale>
                <SimonSaysPlayer/>
            </SimonSaysShell>
        );
    }
}

export default connect(
    state => state,
    dispatch => ({
        actions: bindActionCreators(actionCreators, dispatch),
    }),
)(SimonSaysBoard);