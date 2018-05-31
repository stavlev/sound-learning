import React from 'react';
import { Button } from 'material-ui';
import { Link, withRouter } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignOutButton = () =>
    <Button
        color="contrast"
        type="button"
        component={Link} to={routes.HOME}
        onClick={auth.doSignOut}>
        Sign Out
    </Button>

export default withRouter(SignOutButton);