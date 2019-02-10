import React from 'react';
import {View, StyleSheet} from "react-native";
import GenericButton from "../components/buttons/GenericButton";
import {Video} from "expo";
import BackgroundVideo from "../assets/videos/ovme-master.mp4";

export default class StaffScreen extends React.Component {
  static navigationOptions = {
      header: null
    // title: 'Staff',
    //   headerStyle: {
    //       backgroundColor: 'rgba(53, 96, 68, 1)',
    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //       fontWeight: 'bold',
    //   },
  };

  render() {
    return(
        <View style={styles.container}>
            <Video
                source={BackgroundVideo}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.video}
            />
            <GenericButton onPress={() => this.props.navigation.navigate('Barbers')} line1='Barbers' />
            <GenericButton onPress={() => this.props.navigation.navigate('Stylists')} line1='Stylists' />
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
