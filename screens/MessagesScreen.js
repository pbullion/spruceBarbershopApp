import React from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import RefreshText from "../components/RefreshText";
import axios from "axios";
import moment from "moment";

export default class StaffScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  static navigationOptions = {
    title: "Messages",
    headerStyle: {
      backgroundColor: "rgba(53, 96, 68, 1)",
      fontFamily: "neutra-text-bold"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  getMessages = () => {
    this.setState({ refreshing: false });
    axios.get(`http://52.37.61.234:3001/messages`).then(res => {
      const messages = res.data;
      this.setState({ messages });
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getMessages();
  };

  componentDidMount() {
    this._onRefresh();
  }

  render() {
    console.log(this.state.messages);
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        refreshControl=
        {
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        <RefreshText />
        <View style={{ width: "100%", marginTop: 5 }}>
          {this.state.messages
            ? this.state.messages.reverse().map((l, i) => {
                console.log(l.date);
                return (
                  <ListItem
                    key={i}
                    title={l.title}
                    titleStyle={{
                      fontFamily: "neutra-text-bold",
                      marginBottom: 3
                    }}
                    rightTitle={moment(l.date)
                      .utcOffset("+06:00")
                      .format("ddd, MMM Do")}
                    rightTitleStyle={{
                      fontFamily: "neutra-text-bold",
                      color: "#000000"
                    }}
                    rightTitleNumberOfLines={2}
                    subtitle={l.body}
                    subtitleNumberOfLines={4}
                    hideChevron
                    subtitleStyle={{
                      fontFamily: "neutra-text-light",
                      color: "#000000"
                    }}
                    containerStyle={{
                      width: "100%",
                      fontFamily: "neutra-text-light"
                    }}
                  />
                );
              })
            : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 5
  }
});
