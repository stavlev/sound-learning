import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Typography, Paper, Button} from 'material-ui';
import {PlayArrow, Stop} from "material-ui-icons";
import Knob from "../../common/Knob";
import {startGame,
        finishGame,
        setDestPitchOscillatorNode,
        setKnobOscillatorNode,
        onDestButtonClick,
        onKnobButtonClick,
        onTryAgain
} from "./actionCreators";
import Snackbar from "material-ui/es/Snackbar/Snackbar";
import {compose} from 'recompose';
import {Link, withRouter} from "react-router-dom";
import {getNextLevelRoute, nextLevel} from "../../../helper_functions/levelDetector";

export class PitchEqualizer extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, destFrequency, knobStartFrequency} =  props;

        dispatch(setDestPitchOscillatorNode(destFrequency));
        dispatch(setKnobOscillatorNode(knobStartFrequency));
    }

    render() {
        const {dispatch, audioCtx, knobStartFrequency, destFrequency, isGameStarted,
               isGameFinished, knobOscillatorNode, destOscillatorNode, isDestPlaying, isKnobPlaying,
               isTryAgain, match, authUser, onSetdbUser, updateLevels} = this.props;

        let nextLevelRoute = getNextLevelRoute(match.url);

        return (
            <div className="pitch-equalizer-container">
                <Paper className="pitch-equalizer-paper">
                    <Typography type="display2">
                        Equalizer Game
                    </Typography>
                    <br/>
                    <Typography type="headline">
                        Listen to the destination sound and try to create the same sound by yourself.
                    </Typography>
                    <Typography type="title" component="p">
                        Take as much time as you need to find the exact frequency :)
                    </Typography>
                    <br/>
                    <div className="pitch-equalizer-game">
                        {
                            !isGameStarted ?
                                <Typography type="display1"
                                            onClick={() => dispatch(startGame())}>
                                    Start Game
                                </Typography>
                                : (isGameStarted && !isGameFinished) ?
                                <div>
                                    <div className="dest-freq-container">
                                    <Typography type="subheading" component="p">
                                        Listen to the destination sound:
                                    </Typography>
                                    <Button fab
                                            className="play-dest-button"
                                            onClick={() => {
                                                if (!isDestPlaying) {
                                                    if (isKnobPlaying) {
                                                        dispatch(onKnobButtonClick());
                                                        knobOscillatorNode.disconnect(audioCtx.destination);
                                                    }
                                                    dispatch(onDestButtonClick());
                                                    destOscillatorNode.connect(audioCtx.destination);
                                                }
                                                else {
                                                    dispatch(onDestButtonClick());
                                                    destOscillatorNode.disconnect(audioCtx.destination);
                                                }
                                            }}
                                    >
                                        {
                                            isDestPlaying ? <Stop /> : <PlayArrow />
                                        }
                                    </Button>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="knob-freq-container">
                                        <div className="knob-title">
                                        <Typography type="subheading" component="p">
                                            Hit the play button and try to reach the same sound as the destination sound:
                                        </Typography>
                                        <Button fab
                                                className="play-knob-button"
                                                onClick={() => {
                                                    if (!isKnobPlaying) {
                                                        if (isDestPlaying)
                                                        {
                                                            dispatch(onDestButtonClick());
                                                            destOscillatorNode.disconnect(audioCtx.destination);
                                                        }
                                                        dispatch(onKnobButtonClick());
                                                        knobOscillatorNode.connect(audioCtx.destination);
                                                    }
                                                    else {
                                                        dispatch(onKnobButtonClick());
                                                        knobOscillatorNode.disconnect(audioCtx.destination);
                                                    }
                                                }}
                                        >
                                            {
                                                isKnobPlaying ? <Stop /> : <PlayArrow />
                                            }
                                        </Button>
                                        </div>
                                        <div className="knob-button">
                                            <Typography type="caption" component="p">
                                                frequency
                                            </Typography>
                                            <Knob
                                                className="knob"
                                                min={destFrequency - 40}
                                                max={destFrequency + 60}
                                                step={10}
                                                value={knobStartFrequency}
                                                onChange={(v) => knobOscillatorNode.frequency.value = v}
                                            />
                                        </div>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            className="check"
                                            onClick={() => {
                                                if (knobOscillatorNode.frequency.value === destFrequency) {
                                                    dispatch(finishGame());
                                                }
                                                else {
                                                    dispatch(onTryAgain());
                                                }
                                            }}
                                        >
                                            Click Here To Check Your Answer!
                                        </Button>
                                    </div>
                                </div>
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
                <Snackbar
                    open={isTryAgain}
                    onClose={() => dispatch(onTryAgain())}
                    autoHideDuration={4000}
                    message={<span id="snackbar-fab-message-id">Wrong Answer, Try Again!</span>}
                />
            </div>
        )
    }
}

PitchEqualizer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    audioCtx: PropTypes.object,
    destFrequency: PropTypes.number,
    knobStartFrequency: PropTypes.number,
    destOscillatorNode: PropTypes.object,
    knobOscillatorNode: PropTypes.object,
    isGameStarted: PropTypes.bool,
    isGameFinished: PropTypes.bool,
    isDestPlaying: PropTypes.bool,
    isKnobPlaying: PropTypes.bool,
    isTryAgain: PropTypes.bool,
    authUser: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        audioCtx: state.pitchEqualizer.audioCtx,
        destFrequency: state.pitchEqualizer.destFrequency,
        knobStartFrequency: state.pitchEqualizer.knobStartFrequency,
        destOscillatorNode: state.pitchEqualizer.destOscillatorNode,
        knobOscillatorNode: state.pitchEqualizer.knobOscillatorNode,
        isGameStarted: state.pitchEqualizer.isGameStarted,
        isGameFinished: state.pitchEqualizer.isGameFinished,
        isKnobPlaying: state.pitchEqualizer.isKnobPlaying,
        isDestPlaying: state.pitchEqualizer.isDestPlaying,
        isTryAgain: state.pitchEqualizer.isTryAgain,
        authUser: state.sessionState.authUser
    };
};

export default compose(withRouter, connect(mapStateToProps))(PitchEqualizer);