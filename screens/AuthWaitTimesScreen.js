import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import connect from "react-redux/es/connect/connect";

class WaitTimesScreen extends React.Component {
  static navigationOptions = {
    title: 'Wait Times',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
          <View>
              <Text>Here are the current wait times</Text>
          </View>
      </ScrollView>
    );
  }
}


function mapStateToProps(state) {
    console.log('state', state);
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(WaitTimesScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  customerButton: {
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
  customerButtonText: {
      color: '#ffffff',
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'nanum-gothic'
  },
});
