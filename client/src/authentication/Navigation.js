import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'material-ui';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser, dbUser }) =>
    <div>

        {
            authUser
            ?
                dbUser ? <NavigationAuth authUser={authUser} dbUser={dbUser}/> : <NavigationNonAuth />
            : <NavigationNonAuth />
        }
    </div>

const NavigationAuth = ({authUser, dbUser}) =>
    <div className="accountSignIn">
        <Typography gutterBottom>
            Account: {authUser.email}
        </Typography>
        <SignOutButton />
    </div>

const NavigationNonAuth = () =>
    <div>
        <Button color="contrast" component={Link} to={routes.SIGN_IN}>
            Sign In
        </Button>
    </div>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    dbUser: state.sessionState.dbUser,
});

export default connect(mapStateToProps)(Navigation);