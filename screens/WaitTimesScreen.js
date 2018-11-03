import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import GenericButton from "../components/buttons/GenericButton";

class WaitTimesScreen extends React.Component {
  static navigationOptions = {
    title: 'Wait List',
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {!this.props.currentUser.isLoggedIn ?
              <View style={styles.buttonView}>
                  <GenericButton onPress={() => this.props.navigation.navigate('SignUp')} line1='New' line2='Customer'/>
                  <GenericButton onPress={() => this.props.navigation.navigate('SignIn')} line1='Returning' line2='Customer'/>
              </View> :
              <View>
                  <Text>Here are the current wait times</Text>
              </View>
          }
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
    backgroundColor: '#fff'
  },
  contentContainer: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  }
});
