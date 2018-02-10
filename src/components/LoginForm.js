import React , { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Button, CardSection, Card, Input, Spinner  } from './common/index';
import firebase from 'firebase';

class LoginForm extends Component {
    state = { 
        email: '',
        password: '',
        error: '',
        loading: false,
    };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(this.onLoginFailed.bind(this))
        })
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }

    onLoginFailed() {
        this.setState({ 
            error: 'Authentication failed.',
            loading: false })
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
            Log in
            </Button>
        );
        
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                    secureTextEntry="false"
                    placeholder="Your email"
                    label="Email"
                    onChangeText={ email => this.setState({ email })}
                    value={this.state.email}
                    /> 
                </CardSection> 
                <CardSection>
                    <Input
                    secureTextEntry="true"
                    placeholder="password"
                    label="Password"
                    onChangeText={ password => this.setState({ password  })}
                    value={this.state.password}
                    /> 
                </CardSection>    
                <CardSection />
                <Text style={styles.errorTextStyle}> {this.state.error} </Text>
                <CardSection> 
                  {this.renderButton()}
                </CardSection>    
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
       fontSize: 20,
       alignSelf: 'center',
       color: 'red',
    }
};

export default LoginForm;