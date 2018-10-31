import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import spruceLogo from "../assets/images/logos/spruceLogo.png";

export default class HomeScreen extends React.Component {
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
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={spruceLogo} />
            </View>
            <View>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#ffffff',
    },
    contentContainer: {
        paddingTop: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 50
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
        height: 100,
        width: 250,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: .5,
        borderColor: '#356044',
        backgroundColor: '#356044',
        marginVertical: 15,
        borderRadius: 5,
    },
    customerButtonText: {
        color: '#ffffff',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'nanum-gothic'
    },
    head: { height: 40, backgroundColor: '#f1f8ff', alignItems: 'center' },
    tableHeaderText: { margin: 6, textAlign: 'center', fontWeight: 'bold' },
    text: { margin: 6, textAlign: 'center', fontFamily: 'nanum-gothic' },
});
