import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {auth} from '../firebase';
import {SignUpLink} from './SignUp';
import {Button, TextField, Typography} from 'material-ui';

const SignInPage = ({history}) =>
    <div className="sign-in-page">
        <Typography type="display2" className="sign-in-title" gutterBottom>
            Sign In
        </Typography>
        <SignInForm history={history}/>
        <br/>
        <SignUpLink/>
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {email, password} = this.state;

        const {history} = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push('/');
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {email, password, error} = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit} className="sign-in-form">
                <TextField
                    className="email"
                    label="Email Address"
                    placeholder="Email Address"
                    margin="normal"
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                />
                <br/>
                <TextField
                    className="password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                />
                <br/><br/>
                <Button variant="raised" className="sign-in-button" color="primary" disabled={isInvalid} type="submit">
                    Sign In
                </Button>
                <br/>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withRouter(SignInPage);

export {SignInForm};