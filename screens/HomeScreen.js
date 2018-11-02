import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Table, Row, Rows } from 'react-native-table-component';
import spruceLogo from "../assets/images/logos/spruceLogo.png";

class HomeScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          updates: {
              firstUpdate: 'Opening Late Summer 2018',
              secondUpdate: ''
          },
          tableHeadBusinessHours: ['Business Hours'],
          tableDataBusinessHours: [
              ['Sunday', 'Closed'],
              ['Monday', 'Closed'],
              ['Tuesday', '10 am - 8 pm'],
              ['Wednesday', '10 am - 8 pm'],
              ['Thursday', '10 am - 8 pm'],
              ['Friday', '10 am - 8 pm'],
              ['Saturday', '10 am - 4 pm'],
          ]
      }
  }
  static navigationOptions = {
    header: null,
  };

  render() {
      console.log('home screen props', this.props.currentUser);
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={spruceLogo} />
            </View>
            <View style={styles.imageBackgroundView}>
            {!this.props.currentUser.isLoggedIn ? <View style={styles.buttonView}>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}
                >
                <View style={styles.customerButton}>
                <Text style={styles.customerButtonText}>New</Text>
                <Text style={styles.customerButtonText}>Customer</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}
                >
                <View style={styles.customerButton}>
                <Text style={styles.customerButtonText}>Returning</Text>
                <Text style={styles.customerButtonText}>Customer</Text>
                </View>
                </TouchableOpacity>
                </View> :
                <View>
                    <Text>Welcome, {this.props.currentUser.name}</Text>
                </View>
            }
                <View style={{ marginTop: 30 }}>
                    <Table borderStyle={{borderWidth: 0, borderColor: '#000000'}}>
                        <Row data={this.state.tableHeadBusinessHours} style={styles.head} textStyle={styles.tableHeaderText}/>
                        <Rows data={this.state.tableDataBusinessHours} textStyle={styles.text}/>
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
    head: { height: 40, backgroundColor: '#f1f8ff', alignItems: 'center' },
    tableHeaderText: { margin: 6, textAlign: 'center', fontWeight: 'bold' },
    text: { margin: 6, textAlign: 'center', fontFamily: 'nanum-gothic' },
});
