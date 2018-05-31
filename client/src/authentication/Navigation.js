import React from 'react';
import { connect } from 'react-redux';
import { Typography } from 'material-ui';
import SignOutButton from './SignOut';

const Navigation = ({ authUser, dbUser }) => {
    return <div>
            { authUser
                ? <NavigationAuth authUser={authUser} dbUser={dbUser} />
                : null
            }
            </div>
};


const NavigationAuth = ({authUser, dbUser}) =>
    <div className="accountSignIn">
        <Typography color="inherit" gutterBottom>
            <b>Account:</b> {authUser.email}
        </Typography>
        <SignOutButton />
    </div>


const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    dbUser: state.sessionState.dbUser,
});

export default connect(mapStateToProps)(Navigation);