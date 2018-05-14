import React from 'react';
import { connect } from 'react-redux';

import { firebase, db } from '../firebase';

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        componentDidMount() {
            const { onSetAuthUser, onSetdbUser, authUser} = this.props;

            firebase.auth.onAuthStateChanged(authUser => {
                if (authUser !== null){
                    onSetAuthUser(authUser);
                    db.getUser(authUser.uid).then(snapshot =>
                        onSetdbUser(snapshot.val())
                    );
                }
                else{
                    onSetAuthUser(null);
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
    });

    const mapDispatchToProps = (dispatch) => ({
        onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
        onSetdbUser: (dbUser) => dispatch({type: 'DB_USER_SET', dbUser}),
    });

    return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;