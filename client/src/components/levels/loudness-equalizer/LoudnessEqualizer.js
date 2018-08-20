import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Typography, Paper, Button} from 'material-ui';
import {PlayArrow, Stop} from "material-ui-icons";
import Knob from "../../common/Knob";
import {startGame,
        finishGame,
        setDestOscillatorNode,
        setEqualizerOscillatorNode,
        onDestButtonClick,
        onEqualizerButtonClick,
        onTryAgain
} from "./actionCreators";
import Snackbar from "material-ui/es/Snackbar/Snackbar";
import {compose} from 'recompose';
import {Link, withRouter} from "react-router-dom";
import {getNextLevelRoute, nextLevel} from "../../../helper_functions/levelDetector";
import Slider from "../../common/Silder";

export class LoudnessEqualizer extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, destFrequency, destVolume, knobStartFrequency, sliderStartVolume} =  props;

        dispatch(setDestOscillatorNode(destFrequency, destVolume));
        dispatch(setEqualizerOscillatorNode(knobStartFrequency, sliderStartVolume));
    }

    render() {
        const {dispatch, audioCtx, knobStartFrequency, destFrequency, destVolume, isGameStarted, sliderStartVolume,
               isGameFinished, equalizerOscillatorNode, destOscillatorNode, isDestPlaying, isEqualizerPlaying,
               isTryAgain, match, authUser, onSetdbUser, updateLevels, destGainNode, equalizerGainNode} = this.props;

        let nextLevelRoute = getNextLevelRoute(match.url);

        return (
            <div className="loudness-equalizer-container">
                <Paper className="loudness-equalizer-paper">
                    <Typography type="display2">
                        Equalizer Game
                    </Typography>
                    <br/>
                    <Typography type="headline">
                        Listen to the destination sound and try to create the same sound by yourself.
                    </Typography>
                    <Typography type="title" component="p">
                        Take as much time as you need to find the exact sound :)
                    </Typography>
                    <br/>
                    <div className="loudness-equalizer-game">
                        {
                            !isGameStarted ?
                                <Typography type="display3"
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
                                                    if (isEqualizerPlaying) {
                                                        dispatch(onEqualizerButtonClick());
                                                        equalizerOscillatorNode.disconnect(equalizerGainNode);
                                                        equalizerGainNode.disconnect(audioCtx.destination);
                                                    }
                                                    dispatch(onDestButtonClick());
                                                    destOscillatorNode.connect(destGainNode);
                                                    destGainNode.connect(audioCtx.destination);
                                                }
                                                else {
                                                    dispatch(onDestButtonClick());
                                                    destOscillatorNode.disconnect(destGainNode);
                                                    destGainNode.disconnect(audioCtx.destination);
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
                                    <div className="equalizer-container">
                                        <div className="equalizer-title">
                                        <Typography type="subheading" component="p">
                                            Hit the play button and try to reach the same sound as the destination sound:
                                        </Typography>
                                        <Button fab
                                                className="play-knob-button"
                                                onClick={() => {
                                                    if (!isEqualizerPlaying) {
                                                        if (isDestPlaying)
                                                        {
                                                            dispatch(onDestButtonClick());
                                                            destOscillatorNode.disconnect(destGainNode);
                                                            destGainNode.disconnect(audioCtx.destination);
                                                        }
                                                        dispatch(onEqualizerButtonClick());
                                                        equalizerOscillatorNode.connect(equalizerGainNode);
                                                        equalizerGainNode.connect(audioCtx.destination);
                                                    }
                                                    else {
                                                        dispatch(onEqualizerButtonClick());
                                                        equalizerOscillatorNode.disconnect(equalizerGainNode);
                                                        equalizerGainNode.disconnect(audioCtx.destination);
                                                    }
                                                }}
                                        >
                                            {
                                                isEqualizerPlaying ? <Stop /> : <PlayArrow />
                                            }
                                        </Button>
                                        </div>
                                        <br/>
                                        <div className="equalizer-content">
                                        <div className="knob-container">
                                            <Typography type="caption" component="p">
                                                frequency
                                            </Typography>
                                            <Knob
                                                className="knob"
                                                min={destFrequency - 30}
                                                max={destFrequency + 70}
                                                step={10}
                                                value={knobStartFrequency}
                                                onChange={(v) => equalizerOscillatorNode.frequency.value = v}
                                                knobId="loudness-frequency"
                                            />

                                        </div>
                                        <div className="slider-container">
                                            <Typography type="caption" component="p">
                                                volume
                                            </Typography>
                                            <Slider
                                                className="slider"
                                                onChange={(v) => equalizerGainNode.gain.value = v}
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                value={sliderStartVolume}
                                            />
                                        </div>
                                        </div>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            className="check"
                                            onClick={() => {
                                                if (equalizerOscillatorNode.frequency.value === destFrequency &&
                                                    Math.round(equalizerGainNode.gain.value * 100) === Math.round(destVolume * 100)) {
                                                    dispatch(finishGame());
                                                }
                                                else {
                                                    console.log(equalizerGainNode.gain);
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

LoudnessEqualizer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    audioCtx: PropTypes.object,
    destFrequency: PropTypes.number,
    destVolume: PropTypes.number,
    knobStartFrequency: PropTypes.number,
    sliderStartVolume: PropTypes.number,
    destOscillatorNode: PropTypes.object,
    destGainNode: PropTypes.object,
    equalizerOscillatorNode: PropTypes.object,
    equalizerGainNode: PropTypes.object,
    isGameStarted: PropTypes.bool,
    isGameFinished: PropTypes.bool,
    isDestPlaying: PropTypes.bool,
    isEqualizerPlaying: PropTypes.bool,
    isTryAgain: PropTypes.bool,
    authUser: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        audioCtx: state.loudnessEqualizer.audioCtx,
        destFrequency: state.loudnessEqualizer.destFrequency,
        destVolume: state.loudnessEqualizer.destVolume,
        knobStartFrequency: state.loudnessEqualizer.knobStartFrequency,
        sliderStartVolume: state.loudnessEqualizer.sliderStartVolume,
        destOscillatorNode: state.loudnessEqualizer.destOscillatorNode,
        destGainNode: state.loudnessEqualizer.destGainNode,
        equalizerOscillatorNode: state.loudnessEqualizer.equalizerOscillatorNode,
        equalizerGainNode: state.loudnessEqualizer.equalizerGainNode,
        isGameStarted: state.loudnessEqualizer.isGameStarted,
        isGameFinished: state.loudnessEqualizer.isGameFinished,
        isEqualizerPlaying: state.loudnessEqualizer.isEqualizerPlaying,
        isDestPlaying: state.loudnessEqualizer.isDestPlaying,
        isTryAgain: state.loudnessEqualizer.isTryAgain,
        authUser: state.sessionState.authUser
    };
};

export default compose(withRouter, connect(mapStateToProps))(LoudnessEqualizer);