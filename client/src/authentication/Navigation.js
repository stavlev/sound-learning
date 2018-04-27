import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'material-ui';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) =>
    <div>

        { authUser
            ? <NavigationAuth authUser={authUser}/>
            : <NavigationNonAuth />
        }
    </div>

const NavigationAuth = ({authUser}) =>
    <div className="accountSignIn">
        <Typography variant="display2" gutterBottom>
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
});

export default connect(mapStateToProps)(Navigation);