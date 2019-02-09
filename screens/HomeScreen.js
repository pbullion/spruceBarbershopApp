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
import { Button, Icon, SocialIcon } from "react-native-elements";

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
        axios.get(`http://52.37.61.234:3001/waitlist/totals`)
            .then(res => {
                if (res.data[0].lowestWait.time.waittime) {
                    const currentWaitTime = res.data[0].lowestWait.time.waittime;
                    this.setState({ currentWaitTime })
                } else {
                    this.setState({currentWaitTime: 0})
                }
            });
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
                if (update.length > 0) {
                    this.setState({ update });
                    this.setState({ isThereAnUpdate: true });
                } else {
                    this.setState({ isThereAnUpdate: false });
                }
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
        this._onRefresh();
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
            {this.state.isThereAnUpdate ? <Text style={{ fontSize: 25, marginBottom: 20, paddingHorizontal: 10, textAlign: 'center' }}>{this.state.update[0].update}</Text> : null}
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                <SocialIcon
                    raised={true}
                    type='facebook'
                />
                <SocialIcon
                    raised={true}
                    type='instagram'
                />
            </View>
            <View style={styles.loginAndCurrentUser}>
                {!this.props.currentUser.isLoggedIn ?
                    <View style={styles.buttonView}>
                        <Button
                            raised
                            large
                            title='Log In'
                            borderRadius={18}
                            containerViewStyle={{borderRadius: 18}}
                            buttonStyle={styles.customerButton}
                            onPress={() => this.props.navigation.navigate('SignIn')}
                        />
                        <Button
                            raised
                            large
                            title='Sign Up'
                            borderRadius={18}
                            containerViewStyle={{borderRadius: 18}}
                            buttonStyle={styles.customerButton}
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        />
                    </View> :
                    <View style={styles.userView}>
                        <View style={{ width: '50%' }}>
                            {this.props.currentUser.pictureurl ? <Image style={styles.userImage} source={{uri: this.props.currentUser.pictureurl}} /> : null}
                        </View>
                        <View style={{ width: '50%', alignItems: 'center', }}>
                            <Text style={{ fontSize: 25, paddingBottom: 10 }}>Welcome, {this.props.currentUser.first_name}</Text>
                            <TouchableOpacity onPress={() => this.handlePress()}>
                                <Text style={{ fontSize: 25 }}>LOG OUT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
            {/*<View style={styles.waitTimeView}>*/}
                {/*<Text style={{ fontSize: 30 }}>Current Wait Time</Text>*/}
                {/*<Text style={{ fontSize: 24 }}>For First Available</Text>*/}
                    {/*<Text*/}
                        {/*style={{fontSize: 35}}>{this.state.currentWaitTime ? this.state.currentWaitTime : "0"} min.</Text>*/}
            {/*</View>*/}
            <View style={{ width: '100%', backgroundColor: '#2F553C', flexDirection: 'row', paddingVertical: 15, marginTop: 10 }}>
                <View style={{ width: '25%', marginTop: 100 }}>
                    <Icon
                        name='schedule'
                        color='#ffffff'
                        size={60}
                    />
                </View>
                <View style={{ width: '75%' }}>
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
                </View>
            </View>
            <View style={{ width: '100%', backgroundColor: '#2F553C', flexDirection: 'row', paddingBottom: 35 }}>
                <View style={{ width: '75%' }}>
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
                <View style={{ width: '25%', marginTop: 100 }}>
                    <Icon
                        name='attach-money'
                        color='#ffffff'
                        size={60}
                    />
                </View>
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
        flexDirection: 'column',
        width: '100%',
        marginBottom: 15,
    },
    welcomeUser: {
        // justifyContent: 'space-between',
        flexDirection: 'row',
        // alignItems: 'center',
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
        width: 200,
        marginTop: 35
    },
    loginAndCurrentUser: {
        width: '100%',
        height: 175,
        backgroundColor: '#ffffff',
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
        color: '#ffffff',
        fontSize: 28,
        width: '100%',
        textAlign: 'center',
        marginBottom: 12,
    },
    userView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        marginTop: 10,
        paddingHorizontal: 15
    },
    specialItem: {
        color: '#ffffff',
        fontSize: 21,
        textAlign: 'center'
    },
    tableItem: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center'
    },
    head: { height: 40, backgroundColor: '#f1f8ff', alignItems: 'center' },
    tableHeaderText: { margin: 6, textAlign: 'center', fontWeight: 'bold' },
    text: { margin: 6, textAlign: 'center', fontFamily: 'nanum-gothic' },
});
