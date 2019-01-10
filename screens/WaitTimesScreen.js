import React from 'react';
import {Alert, Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
        this._getInProgressList();
    };

    _getCurrentWaitTime = () => {
        this.setState({refreshing: false});
        axios.get(`http://52.37.61.234:3001/waitList/remainingTimesInProgress`)
            .then(res => {
                const remainingTimesInProgress = res.data;
                this.setState({ remainingTimesInProgress });
                axios.get(`http://52.37.61.234:3001/waitList`)
                    .then(res => {
                        const waitList = res.data;
                        let i;
                        const updatedWaitList = [];
                        if (remainingTimesInProgress) {
                            for (i = 0; i < waitList.length; i++) {
                                if (i < remainingTimesInProgress.length) {
                                    console.log('in the if');
                                    console.log(remainingTimesInProgress[i]);
                                    waitList[i].waitTime = remainingTimesInProgress[i];
                                } else {
                                    let n;
                                    for (n = 0; n < waitList.length; n++) {
                                        console.log('in the for loop');
                                        console.log(waitList[n].waitTime);
                                        console.log(waitList[n].time);
                                        waitList[i].waitTime = waitList[n].time + waitList[n].waitTime;
                                    }
                                }
                                updatedWaitList.push(waitList[i])
                            }
                            this.setState({updatedWaitList});
                        } else {
                            updatedWaitList.push(waitList);
                            this.setState({updatedWaitList});
                        }
                        console.log("************here is the new waitlist", this.state.updatedWaitList);
                    });
            });
    };

    _getWaitList = () => {
        this.setState({refreshing: false});
        axios.get(`http://52.37.61.234:3001/waitList`)
            .then(res => {
                const currentWaitList = res.data;
                this.setState({ currentWaitList });
            });
    };

    _getInProgressList = () => {
        this.setState({refreshing: false});
        axios.get(`http://52.37.61.234:3001/waitList/inProgressList`)
            .then(res => {
                const inProgressList = res.data;
                this.setState({ inProgressList });
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
    handlePress(item) {
        Alert.alert(
            'Add or remove Customer',
            '',
            [
                {text: 'Add', onPress: () => this.addCustomer(item)},
                {text: 'Delete', onPress: () => this.removeCustomer(item)},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            { cancelable: false }
        )
    }
    handlePressInProgress(item) {
        Alert.alert(
            'Remove customer from waitlist',
            '',
            [
                {text: 'Finished', onPress: () => this.finishCustomer(item)},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            { cancelable: false }
        )
    }

    addCustomer(item) {
        axios.put(`http://52.37.61.234:3001/waitList/start/${item.waitlistid}`)
            .then(res => {
                console.log('added');
                this._onRefresh();
            });
    }
    finishCustomer(item) {
        axios.put(`http://52.37.61.234:3001/waitList/done/${item.waitlistid}`)
            .then(res => {
                console.log('added');
                this._onRefresh();
            });
    }

    removeCustomer(item) {
        axios.delete(`http://52.37.61.234:3001/waitList/${item.waitlistid}`)
            .then(res => {
                console.log('deleted');
                this._onRefresh();
            });
    }

    componentDidMount() {
        this._getCurrentWaitTime();
        this._getWaitList();
        this._getInProgressList();
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
          {this.props.currentUser.staff ?
              <View>
                  <Text style={styles.header}>In Progress</Text>
              </View>
              : null
          }
          {(this.props.currentUser.staff && this.state.inProgressList) ? this.state.inProgressList.map((item, index) => {
              return (
                  <TouchableOpacity onPress={() => this.handlePressInProgress(item)} key={index}>
                      <View style={styles.waitListCard}>
                          <View>
                              <Text>{index + 1}</Text>
                          </View>
                          <View style={styles.waitListCardRemainingTime}>
                              <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}>Remaining Time</Text>
                              <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center', marginTop: 5}}>ex min.</Text>
                          </View>
                          <View style={styles.waitListCardInfo}>
                              <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.customer_first_name} {item.customer_last_name.charAt(0)}</Text>
                              <Text style={{paddingTop: 5}}>{item.name}</Text>
                              <Text style={{paddingTop: 5}}>{item.time} min.</Text>
                              <Text style={{paddingTop: 5}}>Staff: {item.staff_first_name ? item.staff_first_name : "First Available"}</Text>
                          </View>
                      </View>
                  </TouchableOpacity>
              )
          }) : null
          }
          <View>
              <Text style={styles.header}>Wait List</Text>
          </View>
          {this.state.updatedWaitList ? this.state.updatedWaitList.map((item, index) => {
              return (
                  <View key={index}>
                  {this.props.currentUser.staff ?
                          <TouchableOpacity onPress={() => this.handlePress(item)}>
                              <View style={styles.waitListCard}>
                                  <View>
                                      <Text>{index + 1}</Text>
                                  </View>
                                  <View style={styles.waitListCardRemainingTime}>
                                      <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}>Wait
                                          Time</Text>
                                      <Text style={{
                                          fontWeight: 'bold',
                                          fontSize: 15,
                                          textAlign: 'center',
                                          marginTop: 5
                                      }}>{item.waitTime} min.</Text>
                                  </View>
                                  <View style={styles.waitListCardInfo}>
                                      <Text style={{
                                          fontWeight: 'bold',
                                          fontSize: 20
                                      }}>{item.customer_first_name} {item.customer_last_name.charAt(0)}</Text>
                                      <Text style={{paddingTop: 5}}>{item.name}</Text>
                                      <Text style={{paddingTop: 5}}>{item.time} min.</Text>
                                      <Text
                                          style={{paddingTop: 5}}>Staff: {item.staff_first_name ? item.staff_first_name : "First Available"}</Text>
                                  </View>
                              </View>
                          </TouchableOpacity> :
                          <View style={styles.waitListCard}>
                              <View>
                                  <Text>{index + 1}</Text>
                              </View>
                              <View style={styles.waitListCardRemainingTime}>
                                  <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}>Wait Time</Text>
                                  <Text style={{
                                      fontWeight: 'bold',
                                      fontSize: 15,
                                      textAlign: 'center',
                                      marginTop: 5
                                  }}>{item.waitTime} min.</Text>
                              </View>
                              <View style={styles.waitListCardInfo}>
                                  <Text style={{
                                      fontWeight: 'bold',
                                      fontSize: 20
                                  }}>{item.customer_first_name} {item.customer_last_name.charAt(0)}</Text>
                                  <Text style={{paddingTop: 5}}>{item.name}</Text>
                                  <Text style={{paddingTop: 5}}>{item.time} min.</Text>
                                  <Text
                                      style={{paddingTop: 5}}>Staff: {item.staff_first_name ? item.staff_first_name : "First Available"}</Text>
                              </View>
                          </View>
                  }
                  </View>
              )
          }) : null
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
        width: '100%',
        backgroundColor: '#ffffff',
    },
    header: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 30,
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
    waitListCard: {
        backgroundColor: '#fff',
        height: 115,
        paddingHorizontal: 20,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: Dimensions.get('window').width > 500 ? .5 : .2,
        borderBottomColor: '#000'
    },
    waitListCardRemainingTime: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        marginLeft: 10,
        width: '35%'
    },
    waitListCardInfo: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        width: '65%'
    },
});
