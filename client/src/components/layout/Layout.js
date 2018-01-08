import React from 'react';
import {AppBar, IconButton, Typography, Toolbar} from 'material-ui';
import Home from 'material-ui-icons/Home';
import ProgressSideBar from './ProgressSideBar';

export default class Layout extends React.Component {
    render() {
        return (
           <div className="layout-container">
               <AppBar position="static" color="primary" className="app-bar">
                   <Toolbar>
                        <Typography type="title" color="inherit" className="app-title">
                            Sound App
                        </Typography>
                       <div>
                       <IconButton
                           color="contrast"
                       >
                           <Home />
                       </IconButton>
                       </div>
                   </Toolbar>
               </AppBar>
               <ProgressSideBar />
           </div>
        );
    }
}
