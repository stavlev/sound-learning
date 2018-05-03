import {Typography, Paper} from 'material-ui';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import * as actions from './actionCreators';

export class GettingToKnow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {subjectHeader, subjectText, chooseSubject, match} = this.props;

        chooseSubject(match.url);

        return (
            <div className="getting-to-know-container">
                <Paper className="getting-to-know-paper">
                    <Typography type="display2">
                        {subjectHeader}
                    </Typography>
                    <br/><br/>
                    <Typography type="title">
                        {subjectText}
                    </Typography>
                </Paper>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        subjectHeader: state.gettingToKnow.subjectHeader,
        subjectText: state.gettingToKnow.subjectText
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        chooseSubject: actions.chooseSubject
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GettingToKnow);