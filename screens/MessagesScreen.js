import React from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import RefreshText from "../components/RefreshText";
import axios from "axios";

export default class StaffScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

  static navigationOptions = {
      title: 'Messages',
      headerStyle: {
          backgroundColor: 'rgba(53, 96, 68, 1)',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
  };
    getMessages = () => {
        this.setState({refreshing: false});
        axios.get(`http://52.37.61.234:3001/messages`)
            .then(res => {
                const messages = res.data;
                this.setState({ messages });
            });
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getMessages();
    };

    componentDidMount() {
        this._onRefresh();
    }

  render() {
      console.log(this.state.messages);
      return(
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            refreshControl={
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
        }
            <RefreshText/>
            <View style={{ width: '100%' }}>
                {this.state.messages ? this.state.messages.map((l,i) => {
                    return (
                        <ListItem
                            leftIcon={<Icon name={l.icon} type='font-awesome' color={l.iconcolor}/>}
                            key={i}
                            title={l.title}
                            subtitle={l.body}
                            hideChevron
                        />
                    )
                    }) : null}
            </View>
        </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 5
    },
});
