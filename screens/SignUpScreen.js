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
import axios from 'axios';
import { signUpUser } from "../actions";
import { SocialIcon } from 'react-native-elements'
import spruceLogo from '../assets/images/logos/spruceLogo.png'

class SignUpScreen extends Component {
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
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={spruceLogo} />
                </View>
                <View style={styles.welcomeView}>
                    <Text style={styles.welcomeText}>
                        Welcome!
                    </Text>
                    <Text style={styles.welcomeText}>
                        Sign up to be able to join the wait list from your phone!
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={signInWithGoogleAsync.bind(this)}>
                        <SocialIcon
                            title='Sign In With Google'
                            button
                            type='google-plus-official'
                            style={{ padding: 20 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signInWithFacebook.bind(this)}>
                        <SocialIcon
                            title='Sign In With Facebook'
                            button
                            type='facebook'
                            style={{ padding: 20 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <SocialIcon
                            title='Sign In With Email'
                            button
                            type='linkedin'
                            style={{ padding: 20 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('App')}>
                        <View style={styles.customerButton}>
                            <Text style={styles.customerButtonText}>Go Back Home</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    );
    }
}


async function performLogin(user, props) {
    console.log('in the login function');
    axios.post(`http://192.168.0.17:3000/users`, {
        user
    }, {
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(function (response) {
            console.log('response in the login function', response.data[0]);
            props.signUpUser(response.data[0]);
            props.navigation.navigate('SignedIn');
        })
        .catch(function (error) {
            console.log('error', error)
        })
};

async function signInWithGoogleAsync() {
    try {
        const result = await Expo.Google.logInAsync({
            iosClientId: '732604278812-g2vo8f8bg9dgge5815ihl7jqs3etri8a.apps.googleusercontent.com',
            iosStandaloneAppClientId: '732604278812-22e53600nlruo7a89712cibvab927jbf.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            let first_name = result.user.givenName;
            let last_name = result.user.familyName;
            let email = result.user.email;
            let phone = '4093443814';
            let owner = false;
            let staff = false;
            let customer = true;
            let user = {first_name, last_name, email, phone, owner, staff, customer};
            console.log(user);
            performLogin(user, this.props)
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
        const { id, picture, name, email, first_name, last_name } = await response.json();
        console.log('id', id);
        console.log('picture', picture);
        console.log('name', name);
        console.log('first_name', first_name);
        console.log('last_name', last_name);
        console.log('email', email);
        this.props.navigation.navigate('SignedIn');
    }
}

export default connect(null, { signUpUser })(SignUpScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    backButtonText: {
        fontSize: 15
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150
    },
    appName: {
        fontSize: 65,
        fontFamily: 'nanum-gothic',
        color: '#000000'
    },
    welcomeView: {
        width: '100%',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 30,
        color: '#000000',
        textAlign: 'center'
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
});
