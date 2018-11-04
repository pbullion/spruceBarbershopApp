import React from 'react';
import {View, StyleSheet} from "react-native";
import GenericButton from "../components/buttons/GenericButton";

export default class StaffScreen extends React.Component {
  static navigationOptions = {
    title: 'Staff',
      headerStyle: {
          backgroundColor: 'rgba(53, 96, 68, 1)',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
  };

  render() {
    return(
        <View style={styles.container}>
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
