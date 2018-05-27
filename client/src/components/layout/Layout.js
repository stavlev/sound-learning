import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from 'material-ui';
import Home from 'material-ui-icons/Home';
import ProgressSideBar from './ProgressSideBar';
import {PitchEqualizer} from "../levels/first-level/equalizer/PitchEqualizer";

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout">
                <AppBar position="fixed" color="primary" className="app-bar">
                    <Toolbar>
                        <Typography type="title" color="inherit" className="app-title">
                            Sound App
                        </Typography>
                        <div>
                            <IconButton color="contrast">
                                <Home/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="layout-container">
                    <ProgressSideBar/>
                    <div className="layout-content">
                        <PitchEqualizer />
                    </div>
                </div>
            </div>
        );
    }
}
