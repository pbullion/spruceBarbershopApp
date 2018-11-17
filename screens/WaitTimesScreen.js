import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import GenericButton from "../components/buttons/GenericButton";
import {Col, Grid} from "react-native-easy-grid";
import RefreshText from "../components/RefreshText";
import {Button} from "react-native-elements";

class WaitTimesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            currentWaitList: [
                {
                    name: "Patrick B",
                    staff: "Brooke"
                },
                {
                    name: "Johnny M",
                    staff: "Michelle"
                },
                {
                    name: "Oscar M",
                    staff: "Brooke"
                },
                {
                    name: "Mallory P",
                    staff: "Patrick"
                },
                {
                    name: "Michelle V",
                    staff: "Brooke"
                },
                {
                    name: "Doug S",
                    staff: "Michelle"
                },
                {
                    name: "Devin D",
                    staff: "Brooke"
                },
                {
                    name: "Michael R",
                    staff: "Brooke"
                },
            ]
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._getCurrentWaitTime();
    };

    _getCurrentWaitTime = () => {
        this.setState({refreshing: false});
    };

  static navigationOptions = {
    title: 'Wait List',
    headerStyle: {
        backgroundColor: 'rgba(53, 96, 68, 1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          refreshControl={
          <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
          />
      }
          <RefreshText/>
          <View style={styles.buttonView}>
              <Button
                  raised
                  large
                  title='Sign Up'
                  borderRadius={18}
                  containerViewStyle={{borderRadius: 18}}
                  buttonStyle={styles.customerButton}
                  onPress={() => this.props.navigation.navigate('SignUp')}
              />
              <Button
                  raised
                  large
                  title='Log In'
                  borderRadius={18}
                  containerViewStyle={{borderRadius: 18}}
                  buttonStyle={styles.customerButton}
                  onPress={() => this.props.navigation.navigate('SignIn')}
              />
          </View>
          <Grid>
              <Col size={1}><Text style={styles.waitListHeader}>Pos</Text></Col>
              <Col size={2}><Text style={styles.waitListHeader}>Name</Text></Col>
              <Col size={1}><Text style={styles.waitListHeader}>Staff</Text></Col>
          </Grid>
          {this.state.currentWaitList ? this.state.currentWaitList.map((item, index) => {
              return (
                  <Grid style={{ height: 35 }} key={index}>
                      <Col size={1}><Text style={[styles.waitListItem]}>{index + 1}</Text></Col>
                      <Col size={2}><Text style={[styles.waitListItem]}>Customer {index + 1}</Text></Col>
                      <Col size={1}><Text style={[styles.waitListItem]}>{item.staff}</Text></Col>
                  </Grid>
              )
          }) : null}
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
        width: '100%',
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        width: '100%',
        paddingTop: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 50
    },
    waitListHeader: {
        color: '#000',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 15,
        marginTop: 10
    },
    waitListItem: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center'
    },
    joinWaitList: {
        height: 75,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: .5,
        borderColor: '#2F553C',
        backgroundColor: '#2F553C',
        marginBottom: 5,
    },
    joinWaitListText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'nanum-gothic'
    },
    buttonView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        marginBottom: 25,
    },
    customerButton: {
        backgroundColor: '#2F553C',
        width: 150
    },
});
