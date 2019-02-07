import React from 'react';
import {Alert, Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import RefreshText from "../components/RefreshText";
import {Button} from "react-native-elements";
import axios from "axios";
import moment from 'moment';
import { addStaffMember } from "../actions";

class WaitTimesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            updatedWaitList: [],
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._getStaff();
        this._getStaffWaitTimes();
    };

    _timeConvert = time => {
        const num = time;
        const hours = (num / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        if (rminutes < 10) {
            return rhours + ":0" + rminutes
        } else {
            return rhours + ":" + rminutes;
        }
    };

    _getStaffWaitTimes = () => {
        this.setState({refreshing: false});
        axios.get(`http://52.37.61.234:3001/waitlist/totals`)
            .then(res => {
                const lowestStaffWait = res.data[0].lowestWait;
                const waitTimesForStaff = res.data[1];
                this.setState({waitTimesForStaff});
                this.setState({lowestStaffWait});
            });
    };
    _getStaff = () => {
        this.setState({refreshing: false});
        axios.get(`http://52.37.61.234:3001/staff/working`)
            .then(res => {
                const staff = res.data;
                let i;
                this.setState({staff});
                console.log(this.state.staff);
                for (i = 0; i < staff.length; i++) {
                    const staffid = staff[i].staffid;
                    axios.get(`http://52.37.61.234:3001/waitlist/staffmember/${staffid}`)
                        .then((res) => {
                            if (res.data.length > 0) {
                                const updatedWaitList = [];
                                for (let i = 0; i < res.data.length; i++) {
                                    if (res.data[i].in_progress) {
                                        res.data[i].remainingTime = res.data[i].time - parseInt(moment(res.data[i].start_time, "HH:mm").fromNow(true), 10);
                                        if (!res.data[i].remainingTime) {
                                            res.data[i].remainingTime = res.data[i].time;
                                        }
                                        updatedWaitList.push(res.data[i]);
                                    } else if (res.data[i].waiting) {
                                        if (i === 0) {
                                            res.data[i].remainingTime = 0
                                        } else if (i === 1) {
                                            res.data[i].remainingTime = res.data[i - 1].remainingTime
                                        } else {
                                            res.data[i].remainingTime = res.data[i - 1].remainingTime + res.data[i - 1].time
                                        }
                                        updatedWaitList.push(res.data[i]);
                                    }
                                }
                                this.setState({[res.data[0].staff_last_name]: updatedWaitList});
                            }
                        });
                }
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
                {text: 'Finished', onPress: () => this.finishCustomer(item)},
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

    handleFirstAvailable(id) {
        axios.get(`http://52.37.61.234:3001/staff/${id}`)
            .then(res => {
                this.handleJoinStaffWaitlist(res.data);
                this.props.navigation.navigate('WaitTimes3')
            });
    }

    handleJoinStaffWaitlist(item) {
        this.props.addStaffMember(item);
        this.props.navigation.navigate('WaitTimes3')
    };

    addCustomer(item) {
        axios.put(`http://52.37.61.234:3001/waitList/start/${item.waitlistid}`)
            .then(res => {
                this._onRefresh();
            });
    }
    finishCustomer(item) {
        axios.put(`http://52.37.61.234:3001/waitList/done/${item.waitlistid}`)
            .then(res => {
                this._onRefresh();
            });
    }

    removeCustomer(item) {
        axios.delete(`http://52.37.61.234:3001/waitList/${item.waitlistid}`)
            .then(res => {
                this._onRefresh();
            });
    }

    componentDidMount() {
        this._onRefresh();
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
                  onPress={() => this.handleFirstAvailable(this.state.lowestStaffWait.time.staffid)}
              >
                  <View style={styles.joinWaitListButton}>
                      <Text style={styles.joinWaitListButtonText}>First Available</Text>
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
          {this.state.staff ? this.state.staff.map((item, index) => {
              if (item.isWorking) {
                  return (
                      <View style={{
                          paddingVertical: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomWidth: .3,
                          width: '100%'
                      }} key={index}>
                          <View style={styles.nameHeader}>
                              <Text
                                  style={{fontSize: 25, textAlign: 'center'}}>{item.first_name} {item.last_name}</Text>
                              <Text style={{
                                  fontSize: 20,
                                  textAlign: 'center',
                                  paddingVertical: 3
                              }}>{item.barber ? "Barber" : "Stylist"}</Text>
                              {this.state.waitTimesForStaff ? this.state.waitTimesForStaff.map((item3, index) => {
                                  for (let i = 0; i < this.state.waitTimesForStaff.length; i++) {
                                      if (item3.time.staffid === item.staffid) {
                                          console.log('item 3', item3);
                                          return (
                                              <Text key={index} style={{fontSize: 20, textAlign: 'center', paddingVertical: 3}}>{item3.time.waittime > 60 ? this._timeConvert(item3.time.waittime) : item3.time.waittime + " min."} wait time</Text>
                                          )
                                      }
                                  }
                              }) : null}

                          </View>
                          {this.props.currentUser.isLoggedIn ?
                              <TouchableOpacity
                                  onPress={() => this.handleJoinStaffWaitlist(item)}
                              >
                                  <View style={styles.joinStaffWaitListButton}>
                                      <Text style={styles.joinStaffWaitListButtonText}>Join {item.first_name}'s wait
                                          list</Text>
                                  </View>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity
                                  onPress={() => this.props.navigation.navigate('SignIn')}
                              >
                                  <View style={styles.joinStaffWaitListButton}>
                                      <Text style={styles.joinStaffWaitListButtonText}>Join {item.first_name}'s wait
                                          list</Text>
                                  </View>
                              </TouchableOpacity>}
                          {this.state[item.last_name] ? this.state[item.last_name].map((item2, index) => {
                              return (
                                  <View key={index}>
                                      {this.props.currentUser.staff ?
                                          <TouchableOpacity onPress={() => this.handlePress(item2)}>
                                              <View style={styles.waitListCard}>
                                                  <View>
                                                      <Text>{index < 1 ? null : index}</Text>
                                                  </View>
                                                  <View style={styles.waitListCardRemainingTime}>
                                                      <Text style={{
                                                          fontWeight: 'bold',
                                                          fontSize: 15,
                                                          textAlign: 'center'
                                                      }}>{item2.in_progress ? "Rem. Time" : "Wait Time"}</Text>
                                                      <Text style={{
                                                          fontWeight: 'bold',
                                                          fontSize: 15,
                                                          textAlign: 'center',
                                                          marginTop: 5
                                                      }}>
                                                          {item2.remainingTime > 60 ? this._timeConvert(item2.remainingTime) : item2.remainingTime + " min."}
                                                      </Text>
                                                  </View>
                                                  <View style={styles.waitListCardInfo}>
                                                      <Text style={{
                                                          fontWeight: 'bold',
                                                          fontSize: 20
                                                      }}>{item2.customer_first_name} {item2.customer_last_name.charAt(0)}</Text>
                                                      <Text style={{paddingTop: 5}}>{item2.name}</Text>
                                                      <Text style={{paddingTop: 5}}>{item2.time} min.</Text>
                                                      <Text
                                                          style={{paddingTop: 5}}>Status: {item2.in_progress ? "In Progress" : "Waiting"}</Text>
                                                  </View>
                                              </View>
                                          </TouchableOpacity> :
                                          <View style={styles.waitListCard}>
                                              <View>
                                                  <Text>{index < 1 ? null : index}</Text>
                                              </View>
                                              <View style={styles.waitListCardRemainingTime}>
                                                  <Text style={{
                                                      fontWeight: 'bold',
                                                      fontSize: 15,
                                                      textAlign: 'center'
                                                  }}>{item2.in_progress ? "Rem. Time" : "Wait Time"}</Text>
                                                  <Text style={{
                                                      fontWeight: 'bold',
                                                      fontSize: 15,
                                                      textAlign: 'center',
                                                      marginTop: 5
                                                  }}>
                                                      {item2.remainingTime > 60 ? this._timeConvert(item2.remainingTime) : item2.remainingTime + " min."}
                                                  </Text>
                                              </View>
                                              <View style={styles.waitListCardInfo}>
                                                  <Text style={{
                                                      fontWeight: 'bold',
                                                      fontSize: 20
                                                  }}>{item2.customer_first_name} {item2.customer_last_name.charAt(0)}</Text>
                                                  <Text style={{paddingTop: 5}}>{item2.name}</Text>
                                                  <Text style={{paddingTop: 5}}>{item2.time} min.</Text>
                                                  <Text
                                                      style={{paddingTop: 5}}>Status: {item2.in_progress ? "In Progress" : "Waiting"}</Text>
                                              </View>
                                          </View>
                                      }
                                  </View>
                              )
                          }) : null};
                      </View>
                  )
              }
          }) : null };
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

export default connect(mapStateToProps, {addStaffMember})(WaitTimesScreen)

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
      nameHeader: {
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
      },
      joinStaffWaitListButton: {
          height: 35,
          width: 200,
          justifyContent: 'center',
          alignContent: 'center',
          borderWidth: .5,
          borderColor: '#2F553C',
          backgroundColor: '#2F553C',
          marginVertical: 5,
          borderRadius: 25,
        },
      joinStaffWaitListButtonText: {
          color: '#fff',
          fontSize: 15,
          textAlign: 'center',
          fontFamily: 'nanum-gothic'
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
