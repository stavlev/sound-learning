import React from 'react';
import {Typography} from 'material-ui';
import {WbIncandescent, VideogameAsset, ShowChart} from 'material-ui-icons';

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-page-content">
                <Typography type="display1">
                    Musiclingo is the ultimate place to learn what SOUND is!
                </Typography>
                <br />
                <Typography type="title">
                    <WbIncandescent/>&nbsp;
                    understand all sound properties
                </Typography>
                <Typography type="title">
                    <VideogameAsset/>&nbsp;
                    play fun games
                </Typography>
                <Typography type="title">
                    <ShowChart/>&nbsp;
                    track your progress
                </Typography>
                <br />
                <Typography type="headline">
                    Join Our Family!
                </Typography>
            </div>
        )
    }
}

export default HomePage;