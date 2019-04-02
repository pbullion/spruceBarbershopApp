import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Alert
} from "react-native";
import { AppAuth } from "expo-app-auth";
import { signInUser, signUpUser, signOutUser } from "../actions";
import { connect } from "react-redux";
import spruceLogo from "../assets/images/logos/spruceLogo.png";
import { Col, Grid } from "react-native-easy-grid";
import axios from "axios";
import { Icon, SocialIcon } from "react-native-elements";
import { WebBrowser, Notifications, Permissions } from "expo";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      update: null,
      businessHours: null,
      specials: null
    };
  }
  static navigationOptions = {
    header: null
  };

  _getCurrentWaitTime = () => {
    this.setState({ refreshing: false });
    axios.get(`http://52.37.61.234:3001/waitlist/totals`).then(res => {
      // if (res.data[0].lowestWait.time.waittime) {
      //     const currentWaitTime = res.data[0].lowestWait.time.waittime;
      //     this.setState({ currentWaitTime })
      // } else {
      //     this.setState({currentWaitTime: 0})
      // }
    });
  };

  _getSpecials = () => {
    axios.get(`http://52.37.61.234:3001/homeScreen/specials`).then(res => {
      const specials = res.data;
      this.setState({ specials });
    });
  };

  _getBusinessHours = () => {
    axios.get(`http://52.37.61.234:3001/homeScreen/businessHours`).then(res => {
      const businessHours = res.data;
      this.setState({ businessHours });
    });
  };
  handlePress = () => {
    this.props.signOutUser();
  };

  _getUpdate = () => {
    axios.get(`http://52.37.61.234:3001/homeScreen/update`).then(res => {
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
    this.setState({ refreshing: true });
    this._getCurrentWaitTime();
    this._getSpecials();
    this._getBusinessHours();
    this._getUpdate();
  };

  componentDidMount() {
    this._onRefresh();
    this.registerForPushNotifications();
    Expo.Notifications.setBadgeNumberAsync(0);
  }

  _facebookHandleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync("https://www.facebook.com/sprucebarbershop/");
  };

  _instagramHandleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync("https://www.instagram.com/sprucebarbershop/");
  };

  registerForPushNotifications = async () => {
    console.log("in the token");
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({ token: token });
  };

  render() {
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
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={spruceLogo} />
        </View>
        {this.state.isThereAnUpdate ? (
          <Text
            style={{
              fontSize: 25,
              marginBottom: 30,
              paddingHorizontal: 5,
              textAlign: "center",
              fontFamily: "neutra-text-bold"
            }}
          >
            {this.state.update[0].update}
          </Text>
        ) : null}
        <View style={styles.loginAndCurrentUser}>
          {!this.props.currentUser.isLoggedIn ? (
            <View style={styles.buttonView}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 0,
                  fontFamily: "neutra-text-light"
                }}
              >
                Log in / Sign Up
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 15,
                  fontFamily: "neutra-text-light"
                }}
              >
                using Google or Facebook
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <TouchableOpacity onPress={signInWithGoogleAsync.bind(this)}>
                  <SocialIcon
                    title="Google"
                    button
                    type="google-plus-official"
                    style={{ padding: 20, width: 150 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={signInWithFacebook.bind(this)}>
                  <SocialIcon
                    title="Facebook"
                    button
                    type="facebook"
                    style={{ padding: 20, width: 150 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.userView}>
              <View>
                {this.props.currentUser.pictureurl ? (
                  <Image
                    style={styles.userImage}
                    source={{ uri: this.props.currentUser.pictureurl }}
                  />
                ) : null}
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 25,
                    paddingBottom: 10,
                    fontFamily: "neutra-text-bold"
                  }}
                >
                  Welcome, {this.props.currentUser.first_name}
                </Text>
                <TouchableOpacity onPress={() => this.handlePress()}>
                  <Text
                    style={{ fontSize: 25, fontFamily: "neutra-text-light" }}
                  >
                    LOG OUT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {/*<View style={styles.waitTimeView}>*/}
        {/*<Text style={{ fontSize: 30 }}>Current Wait Time</Text>*/}
        {/*<Text style={{ fontSize: 24 }}>For First Available</Text>*/}
        {/*<Text*/}
        {/*style={{fontSize: 35}}>{this.state.currentWaitTime ? this.state.currentWaitTime : "0"} min.</Text>*/}
        {/*</View>*/}
        <View
          style={{
            width: "100%",
            backgroundColor: "#2F553C",
            flexDirection: "row",
            paddingVertical: 10,
            marginTop: 10
          }}
        >
          <View style={{ width: "25%", marginTop: 100 }}>
            <Icon name="schedule" color="#ffffff" size={60} />
          </View>
          <View style={{ width: "75%" }}>
            <Grid style={{ paddingTop: 10 }}>
              <Col size={1}>
                <Text style={styles.tableHeader}>Business Hours</Text>
              </Col>
            </Grid>
            {this.state.businessHours
              ? this.state.businessHours.map((item, index) => {
                  return (
                    <Grid style={{ height: 35 }} key={index}>
                      <Col size={2}>
                        <Text style={[styles.tableItem]}>{item.day}</Text>
                      </Col>
                      <Col size={2}>
                        <Text style={[styles.tableItem]}>{item.hours}</Text>
                      </Col>
                    </Grid>
                  );
                })
              : null}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#2F553C",
            flexDirection: "row",
            paddingBottom: 35
          }}
        >
          <View style={{ width: "75%" }}>
            <View style={{ paddingTop: 10 }}>
              {this.state.specials ? (
                <Text style={styles.special}>
                  {this.state.specials[0].special}
                </Text>
              ) : null}
            </View>
            {this.state.specials
              ? this.state.specials.map((item, index) => {
                  return (
                    <View style={{ height: 35 }} key={index}>
                      <Text style={[styles.specialItem]}>{item.type}</Text>
                      {item.type_line2 ? (
                        <Text style={[styles.specialItem]}>
                          {item.type_line2}
                        </Text>
                      ) : null}
                    </View>
                  );
                })
              : null}
          </View>
          <View style={{ width: "25%", marginTop: 100 }}>
            <Icon name="attach-money" color="#ffffff" size={60} />
          </View>
        </View>
        <View style={styles.buttonView}>
          <Text
            style={{
              fontSize: 20,
              marginTop: 15,
              fontFamily: "neutra-text-light"
            }}
          >
            CHECK US OUT ON
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 10,
              fontFamily: "neutra-text-light"
            }}
          >
            FACEBOOK AND INSTAGRAM
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center"
            }}
          >
            <SocialIcon
              raised={true}
              type="facebook"
              onPress={this._facebookHandleOpenWithWebBrowser}
            />
            <SocialIcon
              raised={true}
              type="instagram"
              onPress={this._instagramHandleOpenWithWebBrowser}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    currentUser: state.currentUser
  };
}

async function performLogin(user, accessToken, props, token) {
  axios
    .get(`http://52.37.61.234:3001/users/email/${user.email}`, {
      headers: {
        "content-type": "application/json"
      }
    })
    .then(function(response) {
      console.log("response data TOKEN", token);
      console.log(response.data);
      if (response.data.length > 0 && token) {
        console.log("in the if statement with token****************");
        axios
          .put(
            `http://52.37.61.234:3001/users/socialSignUp`,
            {
              user,
              token
            },
            {
              headers: {
                "content-type": "application/json"
              }
            }
          )
          .then(function(newResponse) {
            props.signInUser(response.data[0], accessToken);
            props.navigation.navigate("WaitTimeList");
          })
          .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              // console.log(error.response.data);
              // console.log(error.response.status);
              // console.log(error.response.headers);
              props.signInUser(response.data[0], accessToken);
              props.navigation.navigate("WaitTimeList");
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log("error.config", error.config);
          });
      } else if (response.data.length > 0) {
        props.signInUser(response.data[0], accessToken);
        props.navigation.navigate("WaitTimeList");
      } else if (token) {
        axios
          .post(
            `http://52.37.61.234:3001/users/socialSignUp`,
            {
              user,
              token
            },
            {
              headers: {
                "content-type": "application/json"
              }
            }
          )
          .then(function(response) {
            props.signUpUser(response.data[0], accessToken);
            props.navigation.navigate("WaitTimeList");
          })
          .catch(function(error) {
            console.log("error", error);
          });
      } else {
        console.log("already signed up and no token");
        axios
          .post(
            `http://52.37.61.234:3001/users/socialSignUp`,
            {
              user
            },
            {
              headers: {
                "content-type": "application/json"
              }
            }
          )
          .then(function(response) {
            props.signUpUser(response.data[0], accessToken);
            props.navigation.navigate("WaitTimeList");
          })
          .catch(function(error) {
            console.log("error", error);
          });
      }
    });
}
// async function logOutAsync() {
//     let clientId = '732604278812-g2vo8f8bg9dgge5815ihl7jqs3etri8a.apps.googleusercontent.com';
//     await Expo.Google.logOutAsync(clientId, this.props.currentUser.accessToken);
//     /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
//     this.props.signOutUser();
//
//
//     // const { type, accessToken } = await Expo.Google.logInAsync({ clientId });
//     // const result = await Expo.Google.logInAsync({
//     //     iosClientId: '732604278812-g2vo8f8bg9dgge5815ihl7jqs3etri8a.apps.googleusercontent.com',
//     //     iosStandaloneAppClientId: '732604278812-22e53600nlruo7a89712cibvab927jbf.apps.googleusercontent.com',
//     //     scopes: ['profile', 'email'],
//     // });
//     //
//     // if (result.type === 'success') {
//     //     /* Log-Out */
//     //     await Expo.Google.logOutAsync({ clientId}, result.accessToken );
//     //     /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
//     //     this.props.signOutUser();
//     // }
// }

async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      iosClientId:
        "968547614348-eokbatrmmtsfgademfaitubna2dafpgv.apps.googleusercontent.com",
      iosStandaloneAppClientId:
        "968547614348-t18b4fbe1liusiof5rmuot61ijl2h9le.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      let first_name = result.user.givenName;
      let last_name = result.user.familyName;
      let email = result.user.email;
      let phone_number = "";
      let pictureUrl = result.user.photoUrl;
      let owner = false;
      let staff = false;
      let customer = true;
      let user = {
        first_name,
        last_name,
        email,
        phone_number,
        pictureUrl,
        owner,
        staff,
        customer
      };
      performLogin(user, result.accessToken, this.props, this.state.token);
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

async function signInWithFacebook() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "360415578030850",
    {
      permissions: ["public_profile", "email"]
    }
  );
  if (type === "success") {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,first_name,last_name,picture.type(large)`
    );
    const { picture, email, first_name, last_name } = await response.json();
    let phone_number = "";
    let owner = false;
    let staff = false;
    let customer = true;
    let pictureUrl = picture.data.url;
    let user = {
      first_name,
      last_name,
      email,
      phone_number,
      pictureUrl,
      owner,
      staff,
      customer
    };
    performLogin(user, null, this.props, null);
  }
}

export default connect(
  mapStateToProps,
  { signInUser, signUpUser, signOutUser }
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff"
  },
  contentContainer: {
    width: "100%",
    paddingTop: 30,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 50
  },
  buttonView: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    fontFamily: "neutra-text-light"
  },
  welcomeUser: {
    // justifyContent: 'space-between',
    flexDirection: "row",
    // alignItems: 'center',
    width: "100%"
  },
  userImage: {
    flexGrow: 1,
    height: 110,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 55,
    marginBottom: 10
  },
  customerButton: {
    backgroundColor: "#2F553C",
    width: 200,
    marginTop: 35
  },
  loginAndCurrentUser: {
    width: "100%",
    // height: 150,
    backgroundColor: "#ffffff"
  },
  image: {
    flexGrow: 1,
    height: 250,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  paragraph: {
    textAlign: "center"
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 25
  },
  logo: {
    width: 250,
    height: 250
  },
  waitTimeView: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  tableHeader: {
    color: "#ffffff",
    fontSize: 28,
    width: "100%",
    backgroundColor: "#2F553C",
    textAlign: "center",
    marginBottom: 12,
    padding: 5,
    fontFamily: "neutra-text-bold"
  },
  specialHeader: {
    color: "#ffffff",
    fontSize: 23,
    width: "100%",
    backgroundColor: "#2F553C",
    textAlign: "center",
    marginBottom: 10,
    padding: 12,
    fontFamily: "neutra-text-bold"
  },
  special: {
    color: "#ffffff",
    fontSize: 28,
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
    padding: 5,
    fontFamily: "neutra-text-bold"
  },
  userView: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 0,
    marginTop: 10,
    paddingHorizontal: 15
  },
  specialItem: {
    color: "#ffffff",
    fontSize: 21,
    textAlign: "center",
    fontFamily: "neutra-text-light"
  },
  tableItem: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "neutra-text-light"
  },
  head: { height: 40, backgroundColor: "#f1f8ff", alignItems: "center" },
  tableHeaderText: { margin: 6, textAlign: "center", fontWeight: "bold" },
  text: { margin: 6, textAlign: "center", fontFamily: "nanum-gothic" }
});
