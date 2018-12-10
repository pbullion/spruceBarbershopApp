import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { signOutUser } from "../actions";
import { connect } from 'react-redux';
import spruceLogo from "../assets/images/logos/spruceLogo.png";
import {Col, Grid} from "react-native-easy-grid";
import axios from "axios";
import { Button } from "react-native-elements";

class HomeScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          refreshing: false,
          update: null,
          businessHours: null,
          specials: null
      }
  }
  static navigationOptions = {
    header: null,
  };

    _getCurrentWaitTime = () => {
        this.setState({refreshing: false});
        axios.get(`http://52.37.61.234:3001/waitList/soonestStaffMember`)
            .then(res => {
                console.log(res.data);
                const soonestStaffMember = res.data;
                this.setState({ soonestStaffMember });
            });
        axios.get(`http://52.37.61.234:3001/waitList/overallTimeInWaiting`)
            .then(res => {
                console.log(res.data);
                const waitTimeInWaiting = res.data;
                this.setState({ waitTimeInWaiting });
            });
    };

    _waitTime = (time1, time2) => {
        let num = time1 + time2;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return rhours + " hours and " + rminutes + " minutes";
    };

    _getSpecials = () => {
        axios.get(`http://52.37.61.234:3001/homeScreen/specials`)
            .then(res => {
                const specials = res.data;
                this.setState({ specials });
            });
    };

    _getBusinessHours = () => {
        axios.get(`http://52.37.61.234:3001/homeScreen/businessHours`)
            .then(res => {
                const businessHours = res.data;
                this.setState({ businessHours });
            });
    };

    _getUpdate = () => {
        axios.get(`http://52.37.61.234:3001/homeScreen/update`)
            .then(res => {
                const update = res.data;
                this.setState({ update });
            });
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._getCurrentWaitTime();
        this._getSpecials();
        this._getBusinessHours();
        this._getUpdate();
    };

    componentDidMount() {
        this._getCurrentWaitTime();
        this._getSpecials();
        this._getBusinessHours();
        this._getUpdate();
    };
    handlePress = () => {
        this.props.signOutUser();
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
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={spruceLogo} />
            </View>
            {this.state.update ? <Text style={{ fontSize: 30, marginBottom: 20, textAlign: 'center' }}>{this.state.update[0].update}</Text> : null}
            <View style={styles.imageBackgroundView}>
            {!this.props.currentUser.isLoggedIn ?
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
                </View> :
                <View style={styles.welcomeUser}>
                    <Image style={styles.userImage} source={{uri: this.props.currentUser.pictureurl}} />
                    <Text style={{ fontSize: 25, paddingBottom: 10 }}>Welcome, {this.props.currentUser.first_name}</Text>
                    <TouchableOpacity onPress={() => this.handlePress()}>
                        <Text style={{ fontSize: 25 }}>LOG OUT</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.waitTimeView}>
                <Text style={{ fontSize: 30 }}>Current Wait Time:</Text>
                {this.state.waitTimeInProgress && this.state.waitTimeInWaiting ?
                    <Text
                        style={{fontSize: 35}}>{this._waitTime(this.state.soonestStaffMember, this.state.waitTimeInWaiting)}</Text>
                    : null
                }
            </View>
                <Grid style={{ paddingTop: 10 }}>
                    <Col size={1}><Text style={styles.tableHeader}>Business Hours</Text></Col>
                </Grid>
                {this.state.businessHours ? this.state.businessHours.map((item, index) => {
                    return (
                        <Grid style={{ height: 35 }} key={index}>
                            <Col size={2}><Text style={[styles.tableItem]}>{item.day}</Text></Col>
                            <Col size={2}><Text style={[styles.tableItem]}>{item.hours}</Text></Col>
                        </Grid>
                    )
                }) : null}
                <Grid style={{ paddingTop: 10 }}>
                    <Col size={1}><Text style={styles.specialHeader}>Specials</Text></Col>
                </Grid>
                <View style={{ paddingTop: 10 }}>
                    {this.state.specials ? <Text style={styles.special}>{this.state.specials[0].special}</Text> : null}
                </View>
                {this.state.specials ? this.state.specials.map((item, index) => {
                    return (
                        <View style={{ height: 35 }} key={index}>
                            <Text style={[styles.specialItem]}>{item.type}</Text>
                            {item.type_line2 ? <Text style={[styles.specialItem]}>{item.type_line2}</Text> : null}
                        </View>
                    )
                }) : null}
            </View>
        </ScrollView>
    );
  }
}


function mapStateToProps(state) {
    console.log('state', state);
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {signOutUser})(HomeScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#ffffff',
    },
    contentContainer: {
        width: '100%',
        paddingTop: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 50
    },
    buttonView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15
    },
    welcomeUser: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    userImage: {
        flexGrow:1,
        height: 125,
        width: 125,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 60,
        marginBottom: 10
    },
    customerButton: {
        backgroundColor: '#2F553C',
        width: 150
    },
    imageBackgroundView: {
        width: '100%'
    },
    image: {
        flexGrow:1,
        height: 250,
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
    },
    paragraph: {
        textAlign: 'center',
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250
    },
    waitTimeView: {
      paddingVertical: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    tableHeader: {
        color: '#ffffff',
        fontSize: 23,
        width: '100%',
        backgroundColor: '#2F553C',
        textAlign: 'center',
        marginBottom: 15,
        padding: 12,
    },
    specialHeader: {
        color: '#ffffff',
        fontSize: 23,
        width: '100%',
        backgroundColor: '#2F553C',
        textAlign: 'center',
        marginBottom: 10,
        padding: 12,
    },
    special: {
        color: '#000000',
        fontSize: 28,
        width: '100%',
        textAlign: 'center',
        marginBottom: 12,
    },
    specialItem: {
        color: '#000',
        fontSize: 21,
        textAlign: 'center'
    },
    tableItem: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center'
    },
    head: { height: 40, backgroundColor: '#f1f8ff', alignItems: 'center' },
    tableHeaderText: { margin: 6, textAlign: 'center', fontWeight: 'bold' },
    text: { margin: 6, textAlign: 'center', fontFamily: 'nanum-gothic' },
});
