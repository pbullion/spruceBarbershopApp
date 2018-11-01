import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";

export default class StaffScreen extends React.Component {
  static navigationOptions = {
    title: 'Staff',
  };

  render() {
    return(
        <View style={styles.menu}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Barbers')}
            >
                <View style={styles.menuOptions}>
                    <Text style={styles.menuText}>Barbers</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Stylists')}
            >
                <View style={styles.menuOptions}>
                    <Text style={styles.menuText}>Stylists</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    menu: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },
    menuOptions: {
        height: 75,
        width: 175,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: .5,
        borderColor: 'rgba(53, 96, 68, 1)',
        backgroundColor: 'rgba(53, 96, 68, 1)',
        marginVertical: 15,
        borderRadius: 5,
    },
    menuText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'nanum-gothic'
    },
});
