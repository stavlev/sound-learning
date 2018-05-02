import React from "react";
import {Button} from 'material-ui';

const Tile = (props) => {
    const {tile, index, onClickTile} = props;

    let classFlipped = tile.flipped ? 'tile effect__click flipped' : 'tile effect__click';
    let text = tile.flipped ? 'Selected' : 'Music';

    const tileBackgroundImage = {
        backgroundImage: 'url(' + tile.image + ')'
    };

    return (
        <Button className={classFlipped} onClick={() => {
            onClickTile(tile, index)
        }}>
            <div className="tile__front">
            </div>
            <div className="tile__back" style={tileBackgroundImage}>
            </div>
            {text}
        </Button>
    );
}

export default Tile;