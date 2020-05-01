import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';

class Login extends Component {
    state = { 
        email: '',
        password: '',
        errorMessage: '',
        emailInvalid: false,
        passwordInvalid: false
    }

    constructor(props) {
        super(props);

        firebase.auth().signOut();
    }

    handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            if (this.props.location.pathname === '/login') {
                this.props.history.push('/');
            }
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            this._setError(errorCode.indexOf('password') > -1 ? 'password' : 'email', errorMessage);
        });
    }

    _setError(field, message) {
        this.setState({ 
            [field + 'Invalid']: true,
            [field === 'email' ? 'passwordInvalid' : 'emailInvalid']: false,
            errorMessage: message
        });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleKeyUp = (e) => {
        if ((e.which || e.keyCode) === 13) {
            this.handleLogin();
        }
    }

    render() { 
        return ( 
            <Container className="login">
                <h2 className="text-center login-header">Sign In</h2>
                <Form className="form mx-auto col-md-4 clearfix">
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input autoFocus invalid={ this.state.emailInvalid } type="email" name="email" id="email" onChange={ this.handleEmailChange } onKeyUp={ this.handleKeyUp } />
                            <FormFeedback>{ this.state.errorMessage }</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input invalid={ this.state.passwordInvalid } type="password" name="password" id="password" onChange={ this.handlePasswordChange } onKeyUp={ this.handleKeyUp } />
                            <FormFeedback>{ this.state.errorMessage }</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Button className="login-button" onClick={ this.handleLogin }>Login</Button>
                </Form>
            </Container>
        );
    }
}
 
export default withRouter(Login);