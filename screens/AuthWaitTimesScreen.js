import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import { Col, Row, Grid } from 'react-native-easy-grid'
import RefreshText from '../components/RefreshText';
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
    static navigationOptions = {
        title: 'Wait Times',
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._getCurrentWaitTime();
    };

    _getCurrentWaitTime = () => {
        this.setState({refreshing: false});
    };

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
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('JoinWaitList')}
          >
              <View style={styles.joinWaitListButton}>
                  <Text style={styles.joinWaitListButtonText}>Join the wait list</Text>
              </View>
          </TouchableOpacity>
          <Grid>
              <Col size={1}><Text style={styles.waitListHeader}>Pos</Text></Col>
              <Col size={2}><Text style={styles.waitListHeader}>Name</Text></Col>
              <Col size={1}><Text style={styles.waitListHeader}>Staff</Text></Col>
          </Grid>
          {this.state.currentWaitList ? this.state.currentWaitList.map((item, index) => {
              return (
                  <Grid style={{ height: 35 }} key={index}>
                      <Col size={1}><Text style={[styles.waitListItem]}>{index + 1}</Text></Col>
                      <Col size={2}><Text style={[styles.waitListItem]}>{item.name}</Text></Col>
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
        paddingTop: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 50
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
    waitListHeader: {
        color: '#000',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 15
    },
    waitListItem: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center'
    },
});
