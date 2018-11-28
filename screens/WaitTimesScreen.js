import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Col, Grid} from "react-native-easy-grid";
import RefreshText from "../components/RefreshText";
import {Button} from "react-native-elements";
import axios from "axios";

class WaitTimesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._getCurrentWaitTime();
        this._getWaitList();
    };

    _getCurrentWaitTime = () => {
        this.setState({refreshing: false});
    };

    _getWaitList = () => {
        this.setState({refreshing: false});
        axios.get(`http://localhost:3001/waitList`)
            .then(res => {
                console.log('wait list response', res.data);
                const currentWaitList = res.data;
                this.setState({ currentWaitList });
            });
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

    componentDidMount() {
        this._getWaitList();
    }

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
          {this.props.currentUser.isLoggedIn ?
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('WaitTimes')}
              >
                  <View style={styles.joinWaitListButton}>
                      <Text style={styles.joinWaitListButtonText}>Join the wait list</Text>
                  </View>
              </TouchableOpacity>
              :
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
          }
          <Grid>
              <Col size={1}><Text style={styles.waitListHeader}>Pos</Text></Col>
              <Col size={1}><Text style={styles.waitListHeader}>Min.</Text></Col>
              <Col size={2}><Text style={styles.waitListHeader}>Name</Text></Col>
              <Col size={2}><Text style={styles.waitListHeader}>Staff</Text></Col>
          </Grid>
          {this.state.currentWaitList ? this.state.currentWaitList.map((item, index) => {
              return (
                  <Grid style={{ height: 35 }} key={index}>
                      <Col size={1}><Text style={[styles.waitListItem]}>{index + 1}</Text></Col>
                      <Col size={1}><Text style={[styles.waitListItem]}>25</Text></Col>
                      <Col size={2}><Text style={[styles.waitListItem]}>{item.first_name}</Text></Col>
                      <Col size={2}><Text style={[styles.waitListItem]}>{item.staffname}</Text></Col>
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
        textAlign: 'center',
        paddingBottom: 3
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
      joinWaitListButton: {
          height: 50,
          width: 250,
          justifyContent: 'center',
          alignContent: 'center',
          borderWidth: .5,
          borderColor: '#2F553C',
          backgroundColor: '#2F553C',
          marginVertical: 15,
          borderRadius: 25,
        },
      joinWaitListButtonText: {
          color: '#fff',
          fontSize: 25,
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
