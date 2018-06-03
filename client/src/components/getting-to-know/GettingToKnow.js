import {Typography, Paper} from 'material-ui';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose} from 'recompose';
import {Link, withRouter} from "react-router-dom";
import {getNextLevelRoute, nextLevel} from "../../helper_functions/levelDetector";
import * as actions from './actionCreators';

export class GettingToKnow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {
            subjectHeader, subjectText, subjectImage, chooseSubject, match,
            authUser, onSetdbUser, updateLevels
        } = this.props;

        let nextLevelRoute = getNextLevelRoute(match.url);
        chooseSubject(match.url);

        return (
            <div className="getting-to-know-container">
                <Paper className="getting-to-know-paper">
                    <div className="getting-to-know-content">
                        <div className="getting-to-know-text">
                            <Typography type="display2">
                                {subjectHeader}
                            </Typography>
                            <br/><br/>
                            <Typography type="title">
                                {subjectText}
                            </Typography>
                        </div>
                        <img src={subjectImage} className="getting-to-know-image"/>
                    </div>
                    <div>
                        <Typography type="title"
                                    onClick={() => nextLevel(authUser, onSetdbUser, updateLevels, match)}
                                    component={Link}
                                    to={nextLevelRoute}
                        >
                            <b>Next Level</b>
                        </Typography>
                    </div>

                </Paper>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        subjectHeader: state.gettingToKnow.subjectHeader,
        subjectText: state.gettingToKnow.subjectText,
        subjectImage: state.gettingToKnow.subjectImage,
        authUser: state.sessionState.authUser
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        chooseSubject: actions.chooseSubject
    }, dispatch);
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(GettingToKnow);