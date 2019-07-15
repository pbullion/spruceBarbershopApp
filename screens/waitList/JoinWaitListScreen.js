import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { setWaitListView } from "../../actions";
import GenericButton from "../../components/buttons/GenericButton";

class JoinWaitListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      waitListFlowStaff: true,
      waitListFlowService: false,
      services: [],
      staffMember: "",
      service: "",
      staffType: null
    };
    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = {
    title: "Join the Waitlist",
    headerStyle: {
      backgroundColor: "rgba(53, 96, 68, 1)",
      fontFamily: "neutra-text-bold"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  handlePress = staffType => {
    this.props.setWaitListView(staffType);
    this.props.navigation.navigate("WaitTimes2");
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <Text>Choose a barber/stylist</Text>
          <View>
            <GenericButton
              onPress={() => this.handlePress("Barber")}
              line1="Barbers"
            />
            <GenericButton
              onPress={() => this.handlePress("Stylist")}
              line1="Stylists"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    waitListFlow: state.waitListFlow
  };
}

export default connect(
  mapStateToProps,
  { setWaitListView }
)(JoinWaitListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff"
  },
  contentContainer: {
    width: "100%",
    paddingTop: 50,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 50
  },
  name: {
    color: "#356044",
    fontSize: 40,
    marginBottom: 20
  },
  dropdown: {
    width: "80%"
  },
  submitButton: {
    backgroundColor: "#356044",
    width: 200,
    marginTop: 40
  },
  picker: {
    alignSelf: "stretch",
    backgroundColor: "#356044",
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 20,
    borderRadius: 10
  },
  pickerText: {
    color: "white"
  }
});
