import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import { apiKeys } from "../config2";
import { connect } from "react-redux";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = () => {
    console.log("handling logout");
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }

    return false;
  };

  onSignIn = (googleUser) => {
    //console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              // IF USER LOGGED IN, THIS SECTION WILL RUN
              if (result.additionalUserInfo.isNewUser) {
                // NEW USER HAS SIGNED UP
                this.props.createUserDispatch(result);
              } else {
                //if the user is already created,
                this.props.updateUserDispatch(result);
              }
            })
            .catch(function (error) {
              // IF USER COULDNT LOGIN THIS SECTION WILL RUN
              // var errorCode = error.code;
              // var errorMessage = error.message;
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: apiKeys.expoClientAndroidGoogleSignIn,

        iosClientId: apiKeys.expoClientIosGoogleSignIn,
        androidStandaloneAppClientId: apiKeys.androidGoogle,
        iosStandaloneAppClientId: apiKeys.iOSGoogle,
        //behavior: "web",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <Screen style={styles.container}>
        <View style={styles.topContainer}>
          <Text> fourth ITERATION </Text>
          <AppButton onPress={this.signInWithGoogleAsync} />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // uid: state.uid,
    // items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDispatch: () => {
      dispatch({ type: "UPDATE_INFO" });
    },
    createUserDispatch: () => {
      dispatch({ type: "CREATE_USER" });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.eights,
  },
  topContainer: {
    marginTop: "20%",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    height: 200,

    backgroundColor: colors.fifth,
    alignSelf: "center",
    padding: 10,
  },
});
