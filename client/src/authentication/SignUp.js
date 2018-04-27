import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { Button, TextField, Typography } from 'material-ui';

const SignUpPage = ({ history }) =>
    <div>
        <Typography variant="display2" gutterBottom>
            Sign Up
        </Typography>
        <SignUpForm history={history}/>
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your own accessible Firebase Database too
                db.doCreateUser(authUser.uid, username, email)
                    .then(() => {
                        this.setState(() => ({ ...INITIAL_STATE }));
                        history.push(routes.GAME);
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <TextField
                    id="Full Name"
                    label="Full Name"
                    placeholder="Full Name"
                    margin="normal"
                    value={username}
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                />
                <br/>
                <TextField
                    id="Email Address"
                    label="Email Address"
                    placeholder="Email Addresse"
                    margin="normal"
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                />
                <br/>
                <TextField
                    id="password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                />
                <br/>
                <TextField
                    id="confirm-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                />
                <br/><br/>
                <Button variant="raised" color="primary" disabled={isInvalid} type="submit">
                    Sign Up
                </Button>
                { error && <p>{error.message}</p> }
            </form>
        );
    }
}

const SignUpLink = () =>
    <Typography variant="display2" gutterBottom>
        Don't have an account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </Typography>

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};