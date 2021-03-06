import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import { apiKeys } from "../config2";
import { connect } from "react-redux";
import Icon from "../components/Icon";
import * as AppleAuthentication from "expo-apple-authentication";

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

          firebase.auth.ApplePro;
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
  onSignInApple = async (idToken) => {
    const provider = new firebase.auth.OAuthProvider("apple.com");
    const credential = provider.credential({
      idToken: idToken,
      // rawNonce: nonce, // nonce value from above
    });

    console.log("BEFORE FIREBASE");
    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((user) => console.log("USER IS", user));
    // console.log("AFTER FIREBASE LOGIN", idToken, nonce);
  };

  loginWithApple = async () => {
    const csrf = Math.random().toString(36).substring(2, 15);
    const nonce = Math.random().toString(36).substring(2, 10);
    const hashedNonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      nonce
    );
    const appleCredential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
      state: csrf,
      nonce: hashedNonce,
    }).catch((err) => console.log("error trying to sign in", err));
    const { identityToken, email, state } = appleCredential;

    this.onSignInApple(identityToken, nonce);
  };

  render() {
    return (
      <Screen style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.mainText}>Track it</Text>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 100, height: 100 }}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.secondText}> Sign in here :)</Text>
          <View style={{ alignSelf: "center" }}>
            <Icon name="arrow-down" iconColor={colors.primary} size={75} />
          </View>

          <AppButton
            style={{ width: 60, height: 60, alignSelf: "center" }}
            iconSize={60}
            iconName="google"
            onPress={this.signInWithGoogleAsync}
          />
          {Platform.OS == "ios" && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
              }
              cornerRadius={5}
              style={{
                width: 200,
                height: 44,
                alignSelf: "center",
                marginVertical: 15,
              }}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  this.onSignInApple(credential.identityToken);
                  // signed in
                } catch (e) {
                  if (e.code === "ERR_CANCELED") {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            />
          )}
          <Text style={styles.secondText}> To start tracking your items! </Text>
          <Image
            source={{
              uri:
                "https://media.tenor.com/images/b826b25547995a6f76d0b491165a3915/tenor.gif",
            }}
            resizeMode="contain"
            style={{
              width: 120,
              height: 200,
              alignSelf: "center",
              marginTop: "5%",
            }}
          />
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
  bottomContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 40,
    color: colors.primary,
  },
  secondText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: colors.fifth,
  },
  topContainer: {
    width: "60%",
    alignItems: "center",
    height: 200,

    alignSelf: "center",
    padding: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
