import React from 'react';
import {Paper, Button} from 'material-ui';
import {PlayArrow, Stop} from "material-ui-icons";

export default class PitchComponent extends React.Component {
    constructor(props) {
        super(props);

        const oscillatorNode = this.props.audioCtx.createOscillator();

        oscillatorNode.type = 'square';
        oscillatorNode.frequency.setValueAtTime(this.props.frequency, this.props.audioCtx.currentTime); // value in hertz
        oscillatorNode.start();

        this.state = {isPlaying: false, frequency: this.props.frequency, oscillatorNode: oscillatorNode};
    }

    handleClick = () => {
        this.setState({isPlaying: !this.state.isPlaying}, () => this.handlePlay())
    };

    handlePlay = () => {
        if (!this.state.isPlaying) {
            this.state.oscillatorNode.disconnect(this.props.audioCtx.destination);
        }
        else {
            this.state.oscillatorNode.connect(this.props.audioCtx.destination);
        }
    }

    render() {
        return (
            <div>
                <Paper className="pitch-paper" elevation={4}>
                    <Button fab style={{backgroundColor: this.props.color}} aria-label="add" className="pitch-button"
                            onClick={() => this.handleClick()}>
                        {
                            this.state.isPlaying ? <Stop/> : <PlayArrow/>
                        }
                    </Button>
                </Paper>
            </div>
        );
    }
}