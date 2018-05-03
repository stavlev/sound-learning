import { Typography } from 'material-ui';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import * as actions from './actionCreators';

export class GettingToKnow extends React.Component {
    constructor(props) {
        super(props);
    }


    render(){

        const {subjectText, chooseSubject, match} = this.props;

        chooseSubject(match.url);

        return(
            <Typography type="headline">
                {subjectText}
            </Typography>
        )
    }

}

function mapStateToProps (state) {
    return {
        subjectText:state.gettingToKnow.subjectText
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        chooseSubject: actions.chooseSubject
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GettingToKnow);