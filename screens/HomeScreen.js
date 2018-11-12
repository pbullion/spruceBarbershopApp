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
import { connect } from 'react-redux';
import { Table, Row, Rows } from 'react-native-table-component';
import spruceLogo from "../assets/images/logos/spruceLogo.png";
import GenericButton from '../components/buttons/GenericButton';
import {Col, Grid} from "react-native-easy-grid";

class HomeScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          refreshing: false,
          updates: {
              firstUpdate: 'Opening Late Summer 2018',
              secondUpdate: ''
          },
          tableDataBusinessHours: [
              {
                  day: "Sunday",
                  hours: "Closed"
              },
              {
                  day: "Monday",
                  hours: "Closed"
              },
              {
                  day: "Tuesday",
                  hours: "10 am - 8 pm"
              },
              {
                  day: "Wednesday",
                  hours: "10 am - 8 pm"
              },
              {
                  day: "Thursday",
                  hours: "10 am - 8 pm"
              },
              {
                  day: "Friday",
                  hours: "10 am - 8 pm"
              },
              {
                  day: "Saturday",
                  hours: "10 am - 4 pm"
              }
          ],
          tableHeadSpecials: ['Discounts/Specials'],
          tableDataSpecials: [
              ['Military/Veteran', '$5 off all services'],
              ['First Responders', '$5 off all services'],
              ['Police/Fire Fighter', '$5 off all services'],
              ['Senior Citizen', '$5 off all services'],
              ['Thirsty Thursday', '10 am - 2 pm $5 off all services']
          ],
      }
  }
  static navigationOptions = {
    header: null,
  };

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._getCurrentWaitTime();
    };

    _getCurrentWaitTime = () => {
        this.setState({refreshing: false});
    };

  render() {
      console.log('home screen current user props', this.props.currentUser);
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
            <View style={styles.imageBackgroundView}>
            {!this.props.currentUser.isLoggedIn ?
                <View style={styles.buttonView}>
                    <GenericButton onPress={() => this.props.navigation.navigate('SignUp')} line1='New' line2='Customer'/>
                    <GenericButton onPress={() => this.props.navigation.navigate('SignIn')} line1='Returning' line2='Customer'/>
                </View> :
                <View>
                    <Text>Welcome, {this.props.currentUser.first_name}</Text>
                    <TouchableOpacity onPress={() => {}}>
                        <Text>LOG OUT</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.waitTimeView}>
                <Text style={{ fontSize: 30 }}>Current Wait Time:</Text>
                <Text style={{ fontSize: 40 }}>45 minutes</Text>
            </View>
                <Grid style={{ paddingTop: 10 }}>
                    <Col size={1}><Text style={styles.tableHeader}>Business Hours</Text></Col>
                </Grid>
                {this.state.tableDataBusinessHours ? this.state.tableDataBusinessHours.map((item, index) => {
                    return (
                        <Grid style={{ height: 35 }} key={index}>
                            <Col size={2}><Text style={[styles.tableItem]}>{item.day}</Text></Col>
                            <Col size={2}><Text style={[styles.tableItem]}>{item.hours}</Text></Col>
                        </Grid>
                    )
                }) : null}
                <View style={{ marginTop: 30 }}>
                    <Table borderStyle={{borderWidth: 0, borderColor: '#000000'}}>
                        <Row data={this.state.tableHeadSpecials} style={styles.head} textStyle={styles.tableHeaderText}/>
                        <Rows data={this.state.tableDataSpecials} textStyle={styles.text}/>
                    </Table>
                </View>
            </View>
        </ScrollView>
    );
  }
    // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  // };

}


function mapStateToProps(state) {
    console.log('state', state);
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(HomeScreen)

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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
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
      paddingTop: 15,
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
    tableItem: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center'
    },
    head: { height: 40, backgroundColor: '#f1f8ff', alignItems: 'center' },
    tableHeaderText: { margin: 6, textAlign: 'center', fontWeight: 'bold' },
    text: { margin: 6, textAlign: 'center', fontFamily: 'nanum-gothic' },
});
