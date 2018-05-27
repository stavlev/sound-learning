import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Typography, Paper} from 'material-ui';
import Knob from "../../../common/Knob";
import TextButton from "../../../common/TextButton";
import {startGame,
        finishGame,
        setDestOscillatorNode,
        setKnobOscillatorNode
} from "./actionCreators";

export class PitchEqualizer extends React.Component {
    constructor(props) {
        super(props);

        props.dispatch(setDestOscillatorNode(props.destFrequency));
        props.dispatch(setKnobOscillatorNode(props.knobStartFrequency));

        props.knobOscillatorNode.connect(props.audioCtx.destination);
    }

    render() {
        const {dispatch, audioCtx, frequencies, isGameStarted, isGameFinished} = this.props;

        return (
            <div className="pitch-equalizer-container">
                <Paper className="pitch-equalizer-paper">
                    <Typography type="display2">
                        Equalizer Game
                    </Typography>
                    <br/>
                    <Typography type="headline">
                        Listen to the destination sound and try to create the same sound by yourself
                    </Typography>
                    <Typography type="title" component="p">
                        Click each button to play/stop the sound.
                        Drag the button and drop it in the correct place.
                    </Typography>
                    <br/>
                    <Typography type="subheading" component="p">
                        Take as much time as you need to find the exact frequency :)
                    </Typography>
                    <div className="pitch-sort-game">
                        {
                            !isGameStarted ?
                                <Typography type="display3"
                                            onClick={() => {
                                                dispatch(startGame());
                                            }}>
                                    Start Game
                                </Typography>
                                : (isGameStarted && !isGameFinished) ?
                                <div>game started
                                    <Knob min={0} max={1} step={0.1} value={0.4} onChange={(v) => this.props.knobOscillatorNode.frequency.value += 0.1} />
                                    <TextButton onChange={(v) => console.log(v)} text={"play"} alternateText={"stop"} />
                                </div>
                                :
                                <Typography type="display3">
                                    Great! You nailed it :)
                                </Typography>
                        }
                    </div>
                </Paper>
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
    isGameFinished: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        audioCtx: state.equalizerGame.audioCtx,
        destFrequency: state.equalizerGame.destFrequency,
        knobStartFrequency: state.equalizerGame.knobStartFrequency,
        destOscillatorNode: state.equalizerGame.destOscillatorNode,
        knobOscillatorNode: state.equalizerGame.knobOscillatorNode,
        isGameStarted: state.equalizerGame.isGameStarted,
        isGameFinished: state.equalizerGame.isGameFinished
    };
};

export default connect(mapStateToProps)(PitchEqualizer);