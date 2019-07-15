import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Text,
  Alert
} from "react-native";
import { connect } from "react-redux";
import BackgroundVideo from "../assets/videos/spruceBackgroundVideo.mov";
import Expo, { Video } from "expo";

import axios from "axios";
import { signUpUser } from "../actions";
import { SocialIcon } from "react-native-elements";
import spruceLogo from "../assets/images/logos/Brooke_Spruce_3-17_green-05-eps.png";
import * as Animatable from "react-native-animatable";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={BackgroundVideo}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={spruceLogo} />
        </View>
        <View style={{ width: "100%", paddingHorizontal: 10 }}>
          <TouchableOpacity onPress={signInWithGoogleAsync.bind(this)}>
            <Animatable.View animation="bounceInUp">
              <SocialIcon
                title="Sign Up With Google"
                button
                type="google-plus-official"
                style={{ padding: 20 }}
              />
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={signInWithFacebook.bind(this)}>
            <Animatable.View animation="bounceInUp">
              <SocialIcon
                title="Sign Up With Facebook"
                button
                type="facebook"
                style={{ padding: 20 }}
              />
            </Animatable.View>
          </TouchableOpacity>
          {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpPage')}>*/}
          {/*<Animatable.View animation="bounceInUp" style={styles.emailButton}>*/}
          {/*<Text style={styles.emailButtonText}>Sign up with Email</Text>*/}
          {/*</Animatable.View>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("WaitTimeList")}
          >
            <Animatable.View
              animation="bounceInUp"
              style={styles.customerButton}
            >
              <Text style={styles.customerButtonText}>Go Back Home</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

async function performLogin(user, props) {
  axios
    .get(`http://18.237.192.82:3001/users/email/${user.email}`, {
      headers: {
        "content-type": "application/json"
      }
    })
    .then(function(response) {
      // console.log(response);
      if (response.data.length > 0) {
        Alert.alert(
          "You are already signed up!",
          "Click below to go to the login",
          [
            {
              text: "Login",
              onPress: () => props.navigation.navigate("SignIn")
            },
            {
              text: "Cancel",
              onPress: () => props.navigation.navigate("Home"),
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      } else {
        axios
          .post(
            `http://18.237.192.82:3001/users/socialSignUp`,
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
            props.signUpUser(response.data[0]);
            props.navigation.navigate("WaitTimeList");
          })
          .catch(function(error) {
            console.log("error", error);
          });
      }
    });
}

async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      iosClientId:
        "732604278812-g2vo8f8bg9dgge5815ihl7jqs3etri8a.apps.googleusercontent.com",
      iosStandaloneAppClientId:
        "732604278812-22e53600nlruo7a89712cibvab927jbf.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      // console.log(result.user);
      let first_name = result.user.givenName;
      let last_name = result.user.familyName;
      let email = result.user.email;
      let phone_number = "4093443814";
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
      performLogin(user, this.props);
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
    let phone_number = "4093443814";
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
    // console.log(user);
    performLogin(user, this.props);
  }
}

export default connect(
  null,
  { signUpUser }
)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  backButtonText: {
    fontSize: 15
  },
  logoContainer: {
    width: "100%",
    alignItems: "center"
  },
  logo: {
    width: "100%",
    height: 300
  },
  appName: {
    fontSize: 65,
    fontFamily: "nanum-gothic",
    color: "#000000"
  },
  welcomeView: {
    width: "100%",
    alignItems: "center"
  },
  welcomeText: {
    fontSize: 30,
    color: "#000000",
    textAlign: "center"
  },
  customerButton: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 0.5,
    borderColor: "#356044",
    backgroundColor: "#356044",
    marginVertical: 15,
    borderRadius: 25
  },
  emailButton: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 0.5,
    borderColor: "#5e59eb",
    backgroundColor: "#5e59eb",
    marginVertical: 15,
    borderRadius: 25
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  emailButtonText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "nanum-gothic"
  },
  customerButtonText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "nanum-gothic"
  }
});
