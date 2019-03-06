import React from 'react';
import {Alert, Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import RefreshText from "../components/RefreshText";
import {Button, SocialIcon} from "react-native-elements";
import axios from "axios";
import moment from 'moment';
import {addStaffMember, signInUser, signUpUser} from "../actions";

class WaitTimesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            updatedWaitList: [],
            working: false
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
                for (i=0; i < staff.length; i++) {
                    if (staff[i].isWorking === true) {
                        this.setState({working:true})
                    }
                }
                for (i = 0; i < staff.length; i++) {
                    const staffid = staff[i].staffid;
                    axios.get(`http://52.37.61.234:3001/waitlist/staffmember/${staffid}`)
                        .then((res) => {
                            if (res.data.length > 0) {
                                const updatedWaitList = [];
                                for (let i = 0; i < res.data.length; i++) {
                                    // if (res.data[i].service2_id === 0) {
                                    //     res.data[i].service2_time = 0
                                    // } else {
                                    //     res.data[i].service2_time = res.data[i].res.data[i].service2_time
                                    // }
                                    // // console.log("******************", res.data[i].service2_time);
                                    // // console.log("asdfasdfasdfasdf", res.data[i].res.data[i].service2_time);
                                    if (res.data[i].in_progress) {
                                        res.data[i].remainingTime = res.data[i].service1_time + res.data[i].service2_time - parseInt(moment(res.data[i].start_time, "HH:mm").fromNow(true), 10);
                                        if (!res.data[i].remainingTime) {
                                            res.data[i].remainingTime = res.data[i].service1_time + res.data[i].service2_time;
                                        }
                                        updatedWaitList.push(res.data[i]);
                                    } else if (res.data[i].waiting) {
                                        if (i === 0) {
                                            res.data[i].remainingTime = 0
                                        } else if (i === 1) {
                                            res.data[i].remainingTime = res.data[i - 1].remainingTime
                                        } else {
                                            res.data[i].remainingTime = res.data[i - 1].remainingTime + res.data[i - 1].service1_time + res.data[i - 1].service2_time
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
        fontFamily: 'neutra-text-bold'
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
            { cancelable: true }
        )
    }
    handlePressInProgress(item) {
        Alert.alert(
            'Remove customer from waitlist',
            '',
            [
                {text: 'Finished', onPress: () => this.finishCustomer(item)},
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
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
        // console.log("here is the wait list current user", this.props.currentUser);
        {this.props.currentUser.shop === true ? this.props.navigation.navigate('WaitListSignUp') : this.props.navigation.navigate('WaitTimes3')}
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}
          refreshControl={
              <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
              />
          }
      >
          <RefreshText/>
          {/*<TouchableOpacity*/}
          {/*onPress={() => this.handleFirstAvailable(this.state.lowestStaffWait.time.staffid)}*/}
          {/*>*/}
          {/*<View style={styles.joinWaitListButton}>*/}
          {/*<Text style={styles.joinWaitListButtonText}>First Available</Text>*/}
          {/*</View>*/}
          {/*</TouchableOpacity>*/}
          {this.props.currentUser.isLoggedIn ?
              null
              :
              <View style={styles.logInView}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontFamily: 'neutra-text-light'}}>Log in / Sign Up</Text>
                  <Text style={{ fontSize: 20, marginBottom: 2, fontFamily: 'neutra-text-light'}}>using Google or Facebook</Text>
                  <Text style={{ fontSize: 20, marginBottom: 10, fontFamily: 'neutra-text-light'}}>to join the Wait List</Text>
                  <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
                      <TouchableOpacity onPress={signInWithGoogleAsync.bind(this)}>
                          <SocialIcon
                              title='Google'
                              button
                              type='google-plus-official'
                              style={{ padding: 20, width: 150 }}
                          />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={signInWithFacebook.bind(this)}>
                          <SocialIcon
                              title='Facebook'
                              button
                              type='facebook'
                              style={{ padding: 20, width: 150 }}
                          />
                      </TouchableOpacity>
                  </View>
              </View>
          }
          <View style={{width: '75%'}}>
            <Text style={{ fontSize: 20, marginTop: 10, fontFamily: 'neutra-text-light', textAlign: 'center'}}>Joining the waitlist from your phone will add $1 to your final total</Text>
          </View>
          {this.state.working === true ? this.state.staff.map((item, index) => {
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
                              <Text style={{fontSize: 25, textAlign: 'center', fontFamily: 'neutra-text-bold'}}>{item.first_name} {item.last_name}</Text>
                              <Text style={{
                                  fontSize: 20,
                                  textAlign: 'center',
                                  paddingVertical: 3,
                                  fontFamily: 'neutra-text-light'
                              }}>{item.barber ? "Barber" : "Stylist"}</Text>
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
                              : null}
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
                                                          textAlign: 'center',
                                                          fontFamily: 'neutra-text-light'
                                                      }}>{item2.in_progress ? "Rem. Time" : "Wait Time"}</Text>
                                                      <Text style={{
                                                          fontWeight: 'bold',
                                                          fontSize: 15,
                                                          textAlign: 'center',
                                                          marginTop: 5,
                                                          fontFamily: 'neutra-text-bold'
                                                      }}>
                                                          {item2.remainingTime > 60 ? this._timeConvert(item2.remainingTime) : item2.remainingTime + " min."}
                                                      </Text>
                                                  </View>
                                                  <View style={styles.waitListCardInfo}>
                                                      <Text style={{
                                                          fontWeight: 'bold',
                                                          fontSize: 20,
                                                          fontFamily: 'neutra-text-bold'
                                                      }}>{item2.customer_first_name} {item2.customer_last_name.charAt(0)}</Text>
                                                      <View style={styles.waitListCardServices}>
                                                          <View style={styles.waitListCardService}>
                                                              <Text style={{paddingTop: 5, fontFamily: 'neutra-text-bold', textAlign: 'center',}}>{item2.service1_name}</Text>
                                                              <Text style={{paddingTop: 5, fontFamily: 'neutra-text-light'}}>{item2.service1_time} min.</Text>
                                                          </View>
                                                          {item2.service2_id ? <View style={styles.waitListCardService}><Text style={{paddingTop: 5, fontFamily: 'neutra-text-bold', textAlign: 'center',}}>{item2.service2_name}</Text>
                                                                  <Text style={{paddingTop: 5, fontFamily: 'neutra-text-light'}}>{item2.service2_time} min.</Text></View>
                                                              : null}
                                                      </View>
                                                      <Text
                                                          style={{paddingTop: 5, fontFamily: 'neutra-text-light'}}>Status: {item2.in_progress ? "In Progress" : "Waiting"}
                                                      </Text>
                                                      <Text
                                                          style={{paddingTop: 5, fontFamily: 'neutra-text-bold', fontWeight: 'bold'}}>{item2.mobile_join ? "JOINED FROM APP" : null}
                                                      </Text>
                                                  </View>
                                              </View>
                                          </TouchableOpacity> :
                                          <View style={styles.waitListCard}>
                                              <View style={{ width: '10%' }}>
                                                  <Text>{index < 1 ? null : index}</Text>
                                              </View>
                                              <View style={styles.waitListCardRemainingTime}>
                                                  <Text style={{
                                                      fontWeight: 'bold',
                                                      fontSize: 15,
                                                      textAlign: 'center',
                                                      fontFamily: 'neutra-text-light'
                                                  }}>{item2.in_progress ? "Rem. Time" : "Wait Time"}</Text>
                                                  <Text style={{
                                                      fontWeight: 'bold',
                                                      fontSize: 15,
                                                      textAlign: 'center',
                                                      marginTop: 5,
                                                      fontFamily: 'neutra-text-bold'
                                                  }}>{item2.remainingTime > 60 ? this._timeConvert(item2.remainingTime) : item2.remainingTime + " min."}</Text>
                                              </View>
                                              <View style={styles.waitListCardInfo}>
                                                  <Text style={{
                                                      fontWeight: 'bold',
                                                      fontSize: 20,
                                                      fontFamily: 'neutra-text-bold'
                                                  }}>{item2.customer_first_name} {item2.customer_last_name.charAt(0)}</Text>
                                                  <View style={styles.waitListCardServices}>
                                                      <View style={styles.waitListCardService}>
                                                          <Text style={{paddingTop: 5, fontFamily: 'neutra-text-bold', textAlign: 'center',}}>{item2.service1_name}</Text>
                                                          <Text style={{paddingTop: 5, fontFamily: 'neutra-text-light'}}>{item2.service1_time} min.</Text>
                                                      </View>
                                                      {item2.service2_id ? <View style={styles.waitListCardService}><Text style={{paddingTop: 5, fontFamily: 'neutra-text-bold', textAlign: 'center'}}>{item2.service2_name}</Text><Text style={{paddingTop: 5, fontFamily: 'neutra-text-light'}}>{item2.service2_time} min.</Text></View>
                                                          : null}
                                                  </View>
                                                  <Text
                                                      style={{paddingTop: 5, fontFamily: 'neutra-text-light'}}>Status: {item2.in_progress ? "In Progress" : "Waiting"}
                                                  </Text>
                                                  <Text
                                                      style={{paddingTop: 5, fontFamily: 'neutra-text-bold', fontWeight: 'bold'}}>{item2.mobile_join ? "JOINED FROM APP" : null}</Text>
                                              </View>
                                          </View>
                                      }
                                  </View>
                              )
                          }) : null}
                      </View>
                  )
              }
          }) : <Text style={{fontFamily: 'neutra-text-light', fontSize: 40, marginTop: 100}}>We are closed</Text>}
      </ScrollView>
    );
  }
}


function mapStateToProps(state) {
    // console.log('state', state);
    return {
        currentUser: state.currentUser
    }
}

async function performLogin(user, props) {
    axios.get(`http://52.37.61.234:3001/users/email/${user.email}`, {
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(function (response) {
            // console.log(response);
            if (response.data.length > 0) {
                props.signInUser(response.data[0]);
                props.navigation.navigate('WaitTimeList');
            } else {
                axios.post(`http://52.37.61.234:3001/users/socialSignUp`, {
                    user
                }, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(function (response) {
                        props.signUpUser(response.data[0]);
                        props.navigation.navigate('WaitTimeList');
                    })
                    .catch(function (error) {
                        // console.log('error', error)
                    })
            }
        });
}

async function signInWithGoogleAsync() {
    try {
        const result = await Expo.Google.logInAsync({
            iosClientId: '968547614348-eokbatrmmtsfgademfaitubna2dafpgv.apps.googleusercontent.com',
            iosStandaloneAppClientId: '968547614348-t18b4fbe1liusiof5rmuot61ijl2h9le.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            // // console.log(result.user);
            let first_name = result.user.givenName;
            let last_name = result.user.familyName;
            let email = result.user.email;
            let phone_number = '4093443814';
            let pictureUrl = result.user.photoUrl;
            let owner = false;
            let staff = false;
            let customer = true;
            let user = {first_name, last_name, email, phone_number, pictureUrl, owner, staff, customer};
            performLogin(user, this.props)
        } else {
            return {cancelled: true};
        }
    } catch(e) {
        return {error: true};
    }
}

async function signInWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('360415578030850', {
        permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
        const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,first_name,last_name,picture.type(large)`
        );
        const { picture, email, first_name, last_name } = await response.json();
        let phone_number = '4093443814';
        let owner = false;
        let staff = false;
        let customer = true;
        let pictureUrl = picture.data.url;
        let user = {first_name, last_name, email, phone_number, pictureUrl, owner, staff, customer};
        // // console.log(user);
        performLogin(user, this.props)
    }
}

export default connect(mapStateToProps, {signInUser, signUpUser, addStaffMember})(WaitTimesScreen)

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
    logInView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        fontFamily: 'neutra-text-light'
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
        fontFamily: 'neutra-text-light'
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
          fontFamily: 'neutra-text-bold'
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
          marginTop: 5,
          textAlign: 'center',
          fontFamily: 'neutra-text-light'
      },
      joinWaitListButtonText: {
          color: '#fff',
          fontSize: 25,
          textAlign: 'center',
          fontFamily: 'neutra-text-light'
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
        // height: 115,
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // borderBottomWidth: Dimensions.get('window').width > 500 ? .5 : .2,
        // borderBottomColor: '#000'
    },
    waitListCardRemainingTime: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // padding: 20,
        // marginLeft: 10,
        width: '35%'
    },
    waitListCardInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20,
        width: '55%'
    },
    waitListCardServices: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    },
    waitListCardService: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
});
