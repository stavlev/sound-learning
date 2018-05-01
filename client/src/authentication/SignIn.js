import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {auth} from '../firebase';
import {SignUpLink} from './SignUp';
import {Button, TextField, Typography} from 'material-ui';

const SignInPage = ({history}) =>
    <div>
        <Typography variant="display2" gutterBottom>
            Sign In
        </Typography>
        <SignInForm history={history}/>
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
            <form onSubmit={this.onSubmit}>
                <TextField
                    id="Email Address"
                    label="Email Address"
                    placeholder="Email Address"
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
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                />
                <br/><br/>
                <Button variant="raised" color="primary" disabled={isInvalid} type="submit">
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