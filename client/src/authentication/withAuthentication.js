import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

import { firebase, db } from '../firebase';
import * as types from "./actionTypes";

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        componentDidMount() {
            const { onSetAuthUser, onSetdbUser, updateLevels, authUser, dbUser} = this.props;

            firebase.auth.onAuthStateChanged(authUser => {
                if (authUser !== null){
                    onSetAuthUser(authUser);
                    db.getUser(authUser.uid).then(snapshot =>
                        onSetdbUser(snapshot.val()),

                    );
                    db.getUser(authUser.uid).then(snapshot =>
                        updateLevels(snapshot.val().level, snapshot.val().subLevel),

                    );
                }
                else{
                    onSetAuthUser(null);
                    updateLevels(0, 0);
                    onSetdbUser(null);
                }
            });
        }

        render() {
            return (
                <Component />
            );
        }
    }

    const mapStateToProps = (state) => ({
        authUser: state.sessionState.authUser,
        dbUser: state.sessionState.dbUser,
    });

    const mapDispatchToProps = (dispatch) => ({
        onSetAuthUser: (authUser) => dispatch({ type: types.AUTH_USER_SET, authUser }),
        onSetdbUser: (dbUser) => dispatch({type: types.DB_USER_SET, dbUser}),
        updateLevels: (level, subLevel) => dispatch({type: types.UPDATE_LEVELS, level, subLevel}),
    });

    return connect(mapStateToProps,mapDispatchToProps)(WithAuthentication);
};

/*function mapStateToProps(state) {
    return {
        authUser: state.sessionState.authUser,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSetAuthUser: actions.onSetAuthUser,
        onSetdbUser: actions.onSetdbUser,
    }, dispatch);
}*/

export default (withAuthentication);