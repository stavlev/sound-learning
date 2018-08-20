import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import logo from "../../assets/Musiclingo.png";
import {AppBar, Toolbar} from 'material-ui';
import ProgressSideBar from './ProgressSideBar';
import PitchEqualizer from "../levels/pitch-equalizer/PitchEqualizer";
import PitchSortGame from "../levels/sort-game/PitchSortGame";
import MultiChoiceQuestionGame from "../levels/multi-choice-question-game/MultiChoiceQuestionGame";
import MemoryGame from "../levels/memory-game/MemoryGame"
import * as routes from '../../constants/routes';
import SignInPage from '../../authentication/SignIn';
import SignUpPage from '../../authentication/SignUp';
import withAuthentication from "../../authentication/withAuthentication";
import Navigation from "../../authentication/Navigation";
import GettingToKnow from "../getting-to-know/GettingToKnow";
import HomePage from "../home-page/HomePage";
import * as cache from "../oscillator/impulseCache";
import LoudnessEqualizer from "../levels/loudness-equalizer/LoudnessEqualizer";
import ConvolverEqualizer from "../levels/convolver-equalizer/ConvolverEqualizer";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        cache.updateImpulseCache();
    }

    render() {
        const {authUser} = this.props;

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
                    {
                        !authUser ?
                            <div className="home-page-container">
                                <HomePage />
                                <div className="sign-in-sign-up">
                                </div>
                                <Route exact path="/" component={SignInPage}/>
                                <Route exact path={routes.HOME} component={SignInPage}/>
                                <Route exact path={routes.SIGN_IN} component={SignInPage}/>
                                <Route exact path={routes.SIGN_UP} component={SignUpPage}/>
                            </div>
                            :
                            <div className="games-container">
                                <ProgressSideBar/>
                                <div className="game-content">
                                    <Route path={routes.PITCH_GETTING_TO_KNOW} component={GettingToKnow}/>
                                    <Route path={routes.PITCH_SORT_GAME} component={PitchSortGame}/>
                                    <Route path={routes.PITCH_MULTI_CHOICE_GAME} component={MultiChoiceQuestionGame}/>
                                    <Route path={routes.PITCH_MEMORY_GAME} component={MemoryGame}/>
                                    <Route path={routes.PITCH_EQUALIZER} component={PitchEqualizer}/>

                                    <Route path={routes.LOUDNESS_GETTING_TO_KNOW} component={GettingToKnow}/>
                                    <Route path={routes.LOUDNESS_SORT_GAME} component={PitchSortGame}/>
                                    <Route path={routes.LOUDNESS_MULTI_CHOICE_GAME} component={MultiChoiceQuestionGame}/>
                                    <Route path={routes.LOUDNESS_MEMORY_GAME} component={MemoryGame}/>
                                    <Route path={routes.LOUDNESS_EQUALIZER} component={LoudnessEqualizer}/>

                                    <Route path={routes.CONVOLVER_GETTING_TO_KNOW} component={GettingToKnow}/>
                                    <Route path={routes.CONVOLVER_SORT_GAME} component={PitchSortGame}/>
                                    <Route path={routes.CONVOLVER_MULTI_CHOICE_GAME} component={MultiChoiceQuestionGame}/>
                                    <Route path={routes.CONVOLVER_MEMORY_GAME} component={MemoryGame}/>
                                    <Route path={routes.CONVOLVER_EQUALIZER} component={ConvolverEqualizer}/>

                                    <Route path={routes.WAVELENGTH_GETTING_TO_KNOW} component={GettingToKnow}/>
                                    <Route path={routes.WAVELENGTH_SORT_GAME} component={PitchSortGame}/>
                                    <Route path={routes.WAVELENGTH_MULTI_CHOICE_GAME} component={MultiChoiceQuestionGame}/>
                                    <Route path={routes.WAVELENGTH_MEMORY_GAME} component={MemoryGame}/>
                                    <Route path={routes.WAVELENGTH_EQUALIZER} component={MemoryGame}/>

                                    <Route path={routes.WAVE_SHAPE_GETTING_TO_KNOW} component={GettingToKnow}/>
                                    <Route path={routes.WAVE_SHAPE_SORT_GAME} component={PitchSortGame}/>
                                    <Route path={routes.WAVE_SHAPE_MULTI_CHOICE_GAME} component={MultiChoiceQuestionGame}/>
                                    <Route path={routes.WAVE_SHAPE_MEMORY_GAME} component={MemoryGame}/>
                                    <Route path={routes.WAVE_SHAPE_EQUALIZER} component={MemoryGame}/>
                                </div>
                            </div>
                    }
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser
    };
};

export default compose(withAuthentication, connect(mapStateToProps))(Layout);
