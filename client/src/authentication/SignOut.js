import React from 'react';
import { Button } from 'material-ui';

import { auth } from '../firebase';

const SignOutButton = () =>
    <Button
        color="contrast"
        type="button"
        onClick={auth.doSignOut}>
        Sign Out
    </Button>

export default SignOutButton;