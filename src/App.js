import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner, Card, CardSection } from './components/common/index';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = {
        loggedIn: null,

    }
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDUyxHAhCQT3q8cj5TGBu6KYAqSK1lUtoo",
            authDomain: "auth-1495d.firebaseapp.com",
            databaseURL: "https://auth-1495d.firebaseio.com",
            projectId: "auth-1495d",
            storageBucket: "auth-1495d.appspot.com",
            messagingSenderId: "880780180272"
          });
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({loggedIn: true}) : this.setState({loggedIn: false})
        });
    }
    renderContent() {

        switch (this.state.loggedIn) {
            case true: return (
                <CardSection>
                    <Button onPress={() => firebase.auth().signOut()}>
                        Log Out
                    </Button>
                 </CardSection>                
            );
            case false: return <LoginForm />
            default: return <Spinner size="large"/>
        }   
    }
    render () {
        return (

            <View>
                <Header headerText="Authentication"> </Header>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
