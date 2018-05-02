import React from 'react';
import PropTypes from 'prop-types';
import {Paper, Button} from 'material-ui';
import {PlayArrow, Stop} from "material-ui-icons";
import {setDefaultOscillatorNode,
        handleSortComponentClick,
} from "./actionCreators"

export default class PitchComponent extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, id, frequency} = props;

        dispatch(setDefaultOscillatorNode(id, frequency));
    }

    render() {
        const {dispatch, audioCtx, id, isPlaying, color, oscillatorNode} = this.props;

        return (
            <div>
                <Paper className="pitch-paper" elevation={4}>
                    <Button fab style={{backgroundColor: color}} aria-label="add" className="pitch-button"
                            onClick={() => {
                                if (!isPlaying) {
                                    dispatch(handleSortComponentClick(id));
                                    oscillatorNode.connect(audioCtx.destination);
                                }
                                else {
                                    dispatch(handleSortComponentClick(id));
                                    oscillatorNode.disconnect(audioCtx.destination);
                                }
                            }}>
                        {
                            isPlaying ? <Stop /> : <PlayArrow />
                        }
                    </Button>
                </Paper>
            </div>
        );
    }
}

PitchComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    audioCtx: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    frequency: PropTypes.number.isRequired,
    oscillatorNode: PropTypes.object
};