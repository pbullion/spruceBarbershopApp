import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import spruceLogo from "../assets/images/logos/spruceLogo.png";
import {SocialIcon} from "react-native-elements";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={spruceLogo} />
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignIn')}
                >
                    <View style={styles.customerButton}>
                        <Text style={styles.customerButtonText}>New</Text>
                        <Text style={styles.customerButtonText}>Customer</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignIn')}
                >
                    <View style={styles.customerButton}>
                        <Text style={styles.customerButtonText}>Returning</Text>
                        <Text style={styles.customerButtonText}>Customer</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
  }

  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  // };

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#ffffff'
    },
    contentContainer: {
        paddingTop: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250
    },
    customerButton: {
        height: 100,
        width: 250,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: .5,
        borderColor: '#000000',
        backgroundColor: '#fff',
        marginVertical: 15,
        borderRadius: 5,
    },
    customerButtonText: {
        color: '#000',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'nanum-gothic'
    },
});
