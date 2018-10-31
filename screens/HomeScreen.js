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
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={spruceLogo} />
            </View>
        </View>
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
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#ffffff'
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250
    },
});
