import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import {AppBar, IconButton, Typography, Toolbar, Button} from 'material-ui';
import Home from 'material-ui-icons/Home';
import ProgressSideBar from './ProgressSideBar';
import PitchSortGame from "../levels/first-level/PitchSortGame";
import * as routes from '../../constants/routes';
import SignInPage from '../../authentication/SignIn';
import SignUpPage from '../../authentication/SignUp';

export default class Layout extends React.Component {
    render() {
        return (
            <Router>
                <div className="layout">
                    <AppBar position="fixed" color="primary" className="app-bar">
                        <Toolbar>
                            <Typography type="title" color="inherit" className="app-title">
                                Sound App
                            </Typography>
                            <div>
                                <Button color="contrast" component={Link} to={routes.SIGN_IN}>
                                    Sign In
                                </Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className="layout-container">
                        <ProgressSideBar/>
                        <div>
                            <hr/>
                            <Route exact path={routes.GAME} component={() => <PitchSortGame/>} />
                            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
                            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
