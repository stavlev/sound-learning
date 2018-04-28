import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import {AppBar, IconButton, Typography, Toolbar, Button} from 'material-ui';
import Home from 'material-ui-icons/Home';
import ProgressSideBar from './ProgressSideBar';
import PitchSortGame from "../levels/sort-game/PitchSortGame";
import MultiChoiceQuestionGame from "../levels/multi-choice-question-game/MultiChoiceQuestionGame";
import * as routes from '../../constants/routes';
import SignInPage from '../../authentication/SignIn';
import SignUpPage from '../../authentication/SignUp';
import withAuthentication from "../../authentication/withAuthentication";
import Navigation from "../../authentication/Navigation"

class Layout extends React.Component {
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
                                <Navigation />
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className="layout-container">
                        <ProgressSideBar/>
                        <div>
                            <hr/>
                            <Route exact path={routes.GAME} component={() => <MultiChoiceQuestionGame/>} />
                            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
                            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}


export default withAuthentication(Layout);
