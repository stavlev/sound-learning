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
    onTryAgain,
    updateLevels,
    onSetdbUser,
} from "./actionCreators";
import Snackbar from "material-ui/es/Snackbar/Snackbar";
import {compose} from 'recompose';
import {Link, withRouter} from "react-router-dom";
import {getNextLevelRoute, nextLevel} from "../../../helper_functions/levelDetector";
import Slider from "../../common/Silder";
import * as cache from "../../oscillator/impulseCache";

export class ConvolverEqualizer extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, destFrequency, destVolume, knobStartFrequency, sliderStartVolume, destConvolver, knobStartConvolver} = props;

        dispatch(setDestOscillatorNode(destFrequency, destVolume, destConvolver));
        dispatch(setEqualizerOscillatorNode(knobStartFrequency, sliderStartVolume, knobStartConvolver));
    }

    render() {
        const {dispatch, audioCtx, knobStartFrequency, destFrequency, destVolume, destConvolver, isGameStarted, sliderStartVolume,
            isGameFinished, equalizerOscillatorNode, destOscillatorNode, isDestPlaying, isEqualizerPlaying,
            isTryAgain, match, authUser,
            destGainNode, equalizerGainNode, destConvolverNode, equalizerConvolverNode, knobStartConvolver} = this.props;

        let nextLevelRoute = getNextLevelRoute(match.url);

        return (
            <div className="convolver-equalizer-container">
                <Paper className="convolver-equalizer-paper">
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
                    <div className="convolver-equalizer-game">
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
                                                            equalizerGainNode.disconnect(equalizerConvolverNode);
                                                            equalizerConvolverNode.disconnect(audioCtx.destination);
                                                        }
                                                        dispatch(onDestButtonClick());
                                                        destOscillatorNode.connect(destGainNode);
                                                        destGainNode.connect(destConvolverNode);
                                                        destConvolverNode.connect(audioCtx.destination);
                                                    }
                                                    else {
                                                        dispatch(onDestButtonClick());
                                                        destOscillatorNode.disconnect(destGainNode);
                                                        destGainNode.disconnect(destConvolverNode);
                                                        destConvolverNode.disconnect(audioCtx.destination);
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
                                                                destGainNode.disconnect(destConvolverNode);
                                                                destConvolverNode.disconnect(audioCtx.destination);
                                                            }
                                                            dispatch(onEqualizerButtonClick());
                                                            equalizerOscillatorNode.connect(equalizerGainNode);
                                                            equalizerGainNode.connect(equalizerConvolverNode);
                                                            equalizerConvolverNode.connect(audioCtx.destination);
                                                        }
                                                        else {
                                                            dispatch(onEqualizerButtonClick());
                                                            equalizerOscillatorNode.disconnect(equalizerGainNode);
                                                            equalizerGainNode.disconnect(equalizerConvolverNode);
                                                            equalizerConvolverNode.disconnect(audioCtx.destination);
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
                                                    knobId="convolver-frequency"
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
                                            <div className="knob-container">
                                                <Typography type="caption" component="p">
                                                    convolution
                                                </Typography>
                                                <Knob
                                                    className="knob"
                                                    min={1}
                                                    max={4}
                                                    step={1}
                                                    value={knobStartConvolver}
                                                    onChange={(v) => equalizerConvolverNode.buffer = cache.getImpulse(v)}
                                                    knobId="convolver"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            className="check"
                                            onClick={() => {
                                                if (equalizerOscillatorNode.frequency.value === destFrequency &&
                                                    Math.round(equalizerGainNode.gain.value * 100) === Math.round(destVolume * 100) &&
                                                    equalizerConvolverNode.buffer === cache.getImpulse(destConvolver)) {
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

ConvolverEqualizer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    audioCtx: PropTypes.object,
    destFrequency: PropTypes.number,
    destVolume: PropTypes.number,
    destConvolver: PropTypes.number,
    knobStartFrequency: PropTypes.number,
    sliderStartVolume: PropTypes.number,
    knobStartConvolver: PropTypes.number,
    destOscillatorNode: PropTypes.object,
    destGainNode: PropTypes.object,
    destConvolverNode: PropTypes.object,
    equalizerOscillatorNode: PropTypes.object,
    equalizerGainNode: PropTypes.object,
    equalizerConvolverNode: PropTypes.object,
    isGameStarted: PropTypes.bool,
    isGameFinished: PropTypes.bool,
    isDestPlaying: PropTypes.bool,
    isEqualizerPlaying: PropTypes.bool,
    isTryAgain: PropTypes.bool,
    authUser: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        audioCtx: state.convolverEqualizer.audioCtx,
        destFrequency: state.convolverEqualizer.destFrequency,
        destVolume: state.convolverEqualizer.destVolume,
        destConvolver: state.convolverEqualizer.destConvolver,
        knobStartFrequency: state.convolverEqualizer.knobStartFrequency,
        sliderStartVolume: state.convolverEqualizer.sliderStartVolume,
        knobStartConvolver: state.convolverEqualizer.knobStartConvolver,
        destOscillatorNode: state.convolverEqualizer.destOscillatorNode,
        destGainNode: state.convolverEqualizer.destGainNode,
        destConvolverNode: state.convolverEqualizer.destConvolverNode,
        equalizerOscillatorNode: state.convolverEqualizer.equalizerOscillatorNode,
        equalizerGainNode: state.convolverEqualizer.equalizerGainNode,
        equalizerConvolverNode: state.convolverEqualizer.equalizerConvolverNode,
        isGameStarted: state.convolverEqualizer.isGameStarted,
        isGameFinished: state.convolverEqualizer.isGameFinished,
        isEqualizerPlaying: state.convolverEqualizer.isEqualizerPlaying,
        isDestPlaying: state.convolverEqualizer.isDestPlaying,
        isTryAgain: state.convolverEqualizer.isTryAgain,
        authUser: state.sessionState.authUser
    };
};

export default compose(withRouter, connect(mapStateToProps))(ConvolverEqualizer);