import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import { apiKeys } from "../config2";

export default class WelcomeScreen extends Component {
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
              console.log("User Logged IN");

              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    //set params for what data you want to store example
                    // last_name: result.additionalUserInfo.profile.family_name,

                    gmail: result.user.uid,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    locale: result.additionalUserInfo.profile.locale,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  });

                this.setState({
                  first_name: result.additionalUserInfo.profile.given_name,
                }).then(function (snapshot) {
                  //console.log('snapshot,snapshot);
                });
              } else {
                //if the user is already created, we want to update their last logged in and picture
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_loggedin: Date.now(),
                    profile_picture: result.additionalUserInfo.profile.picture,
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
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
          <Text> Tracker </Text>
          <AppButton onPress={this.signInWithGoogleAsync} />
        </View>
      </Screen>
    );
  }
}

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
