import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Text
}
from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo';
import { signInUser } from "../actions";
import { SocialIcon, FormInput, FormLabel } from 'react-native-elements'
import axios from "axios";
import * as Animatable from "react-native-animatable";

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.welcomeView}>
                    <Text style={styles.welcomeText}>
                        Log In
                    </Text>
                    <Text style={{ fontSize: 15, paddingTop: 50 }}>
                        Only logins from google or facebook work right now
                    </Text>
                </View>
                <View style={{ width: '100%', paddingHorizontal: 10 }}>
                    <View>
                        <FormLabel labelStyle={{ color: '#ffffff', fontFamily: 'nanum-gothic' }}>Email</FormLabel>
                        <FormInput inputStyle={{ color: '#ffffff', fontFamily: 'nanum-gothic' }} onChangeText={() => {}} focus/>

                        <FormLabel labelStyle={{ color: '#ffffff', fontFamily: 'nanum-gothic' }}>Password</FormLabel>
                        <FormInput inputStyle={{ color: '#ffffff', fontFamily: 'nanum-gothic' }} onChangeText={() => {}} focus/>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('App')}>
                        <Animatable.View animation="bounceInDown" style={styles.logInButton}>
                            <Text style={styles.logInButtonText}>Log In</Text>
                        </Animatable.View>
                    </TouchableOpacity>
                    <View style={styles.socialLogins}>
                        <TouchableOpacity onPress={signInWithGoogleAsync.bind(this)}>
                            <Animatable.View animation="bounceInDown">
                                <SocialIcon
                                    title='Google'
                                    button
                                    type='google-plus-official'
                                    style={{ padding: 20, width: 150 }}
                                />
                            </Animatable.View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={signInWithFacebook.bind(this)}>
                            <Animatable.View animation="bounceInDown">
                                <SocialIcon
                                    title='Facebook'
                                    button
                                    type='facebook'
                                    style={{ padding: 20, width: 150 }}
                                />
                            </Animatable.View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('App')}>
                        <Animatable.View animation="bounceInDown" style={styles.customerButton}>
                            <Text style={styles.customerButtonText}>Go Back Home</Text>
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
            </View>
    );
    }
}

async function performLogin(email, props) {
    console.log('in the login function');
    console.log(email);
    axios.get(`http://52.37.61.234:3001/users/email/${email}`, {
        email
    }, {
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(function (response) {
            props.signInUser(response.data[0]);
            props.navigation.navigate('AuthWaitTimes');
        })
        .catch(function (error) {
            console.log('USER IS NOT SIGNED UP');
            console.log('error', error);
            props.navigation.navigate('SignUp');
        });
};

async function signInWithGoogleAsync() {
    try {
        const result = await Expo.Google.logInAsync({
            iosClientId: '732604278812-g2vo8f8bg9dgge5815ihl7jqs3etri8a.apps.googleusercontent.com',
            iosStandaloneAppClientId: '732604278812-22e53600nlruo7a89712cibvab927jbf.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            performLogin(result.user.email, this.props)
        } else {
            return {cancelled: true};
        }
    } catch(e) {
        return {error: true};
    }
}

async function signInWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('360415578030850', {
        permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,first_name,last_name,picture.type(large)`
        );
        const { email } = await response.json();
        console.log('email', email);
        performLogin(email, this.props)

    }
}

export default connect(null, { signInUser })(LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#356044'
    },
    socialLogins: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 30
    },
    backButtonText: {
        fontSize: 15
    },
    welcomeView: {
        width: '100%',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 50,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'nanum-gothic'
    },
    customerButton: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: .5,
        borderColor: '#356044',
        backgroundColor: '#356044',
        marginVertical: 15,
        borderRadius: 25,
    },
    customerButtonText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'nanum-gothic'
    },
    logInButton: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: .5,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        marginTop: 30,
        borderRadius: 25,
    },
    logInButtonText: {
        color: '#356044',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'nanum-gothic'
    },
});
