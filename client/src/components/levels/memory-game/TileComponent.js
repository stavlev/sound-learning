import React from "react";
import {Button, Paper} from 'material-ui';
import {PlayArrow, HourglassEmpty, Done} from "material-ui-icons";

const TileComponent = (props) => {
    const {tile, index, color, onClickTile} = props;

    return (
        <Paper className="memory-paper" elevation={4}>
            <Button fab style={{backgroundColor: color}} aria-label="add" className="memory-button"
                    onClick={() => {
                        onClickTile(tile, index)
                    }}>
                {tile.matched ? <Done/> : (tile.flipped ? <HourglassEmpty/> : <PlayArrow/>)}
            </Button>
        </Paper>
    );
}

export default TileComponent;