import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text, Alert
}
    from 'react-native';
import { connect } from 'react-redux';
import { signInUser } from "../actions";
import { FormInput, FormLabel } from 'react-native-elements'
import axios from "axios";
import * as Animatable from "react-native-animatable";

class SignUpPageScreen extends Component {
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
                       Sign Up
                    </Text>
                </View>
                <View style={{ width: '100%', paddingHorizontal: 10 }}>
                    <View>
                        <FormLabel labelStyle={{ color: '#ffffff', fontFamily: 'nanum-gothic' }}>Phone Number</FormLabel>
                        <FormInput inputStyle={{ color: '#ffffff', fontFamily: 'nanum-gothic' }} onChangeText={(value) => {this.setState({phone_number: value})}} focus/>
                    </View>
                    <TouchableOpacity onPress={() => performSignUp(this.state.phone_number, this.props)}>
                        <Animatable.View animation="bounceInDown" style={styles.logInButton}>
                            <Text style={styles.logInButtonText}>Sign Up</Text>
                        </Animatable.View>
                    </TouchableOpacity>
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

async function performSignUp(first_name, last_name, email, phone_number, password, confirmPassword, props) {
    if (password === confirmPassword) {
        axios.post(`http://52.37.61.234:3001/users`, {
            first_name, last_name, email, phone_number, password
        }, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                props.signInUser(response.data[0]);
                props.navigation.navigate('WaitTimeList');
            })
            .catch(function (error) {
                console.log('error', error);
            });
    } else {
        Alert.alert(
            'Passwords do not match',
            '',
            [
                {text: 'OK', onPress: () => {}},
            ],
            { cancelable: false }
        )
    }
}

export default connect(null, { signInUser })(SignUpPageScreen)

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
