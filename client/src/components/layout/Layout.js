import React from 'react';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import logo from "../../assets/Musiclingo.png";
import {AppBar, Toolbar, Typography, IconButton} from 'material-ui';
import ProgressSideBar from './ProgressSideBar';
import PitchEqualizer from "../levels/equalizer/PitchEqualizer";
import PitchSortGame from "../levels/sort-game/PitchSortGame";
import MultiChoiceQuestionGame from "../levels/multi-choice-question-game/MultiChoiceQuestionGame";
import MemoryGame from "../levels/memory-game/MemoryGame"
import * as routes from '../../constants/routes';
import SignInPage from '../../authentication/SignIn';
import SignUpPage from '../../authentication/SignUp';
import withAuthentication from "../../authentication/withAuthentication";
import Navigation from "../../authentication/Navigation";
import GettingToKnow from "../getting-to-know/GettingToKnow";
import * as cache from "../oscillator/impulseCache";

class Layout extends React.Component {

    constructor(props) {
        super(props);
        cache.updateImpulseCache();
    }

    render() {
        return (
            <Router>
                <div className="layout">
                    <AppBar color="primary" className="app-bar">
                        <Toolbar className="app-tool-bar">
                            <img className="logo" src={logo}/>
                            <Navigation/>
                        </Toolbar>
                    </AppBar>
                    <div className="layout-container">
                        <ProgressSideBar/>
                        <div>
                            <Route exact path={routes.SIGN_IN} component={SignInPage}/>
                            <Route exact path={routes.SIGN_UP} component={SignUpPage}/>
                        </div>
                        <div>
                            <Route path={routes.PITCH_GETTING_TO_KNOW} component={GettingToKnow}/>
                            <Route path={routes.PITCH_SORT_GAME} component={PitchSortGame}/>
                            <Route path={routes.PITCH_MULTI_CHOICE_GAME} component={MultiChoiceQuestionGame}/>
                            <Route path={routes.PITCH_MEMORY_GAME} component={MemoryGame}/>
                            <Route path={routes.PITCH_EQUALIZER} component={PitchEqualizer}/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}


export default withAuthentication(Layout);
