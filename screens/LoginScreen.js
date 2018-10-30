import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo';
import { signInUser } from "../actions";
import googleSignInButton from '../assets/images/google.png'

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
    <Text style={styles.appName}>Spruce Barbershop</Text>
        <TouchableOpacity onPress={signInWithGoogleAsync.bind(this)}>
    <Image source={googleSignInButton} />
        </TouchableOpacity>
        </View>
    );
    }
}
async function signInWithGoogleAsync() {
    try {
        const result = await Expo.Google.logInAsync({
            iosClientId: '732604278812-g2vo8f8bg9dgge5815ihl7jqs3etri8a.apps.googleusercontent.com',
            iosStandaloneAppClientId: '732604278812-22e53600nlruo7a89712cibvab927jbf.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            // this.props.signInUser(result.user);
            console.log(result);
            this.props.navigation.navigate('App');
        } else {
            return {cancelled: true};
        }
    } catch(e) {
        return {error: true};
    }
}

export default connect(null, { signInUser })(LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 200,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#D800FF'
    },
    appName: {
        fontSize: 65,
        fontFamily: 'nanum-gothic',
        color: '#fff'
    }
});
