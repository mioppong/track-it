import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Plane } from "react-native-animated-spinkit";
import colors from "../config/colors";
import firebase from "firebase";
import { firebaseConfig } from "../config";
import { connect } from "react-redux";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  checkIfLoggedIn = () => {
    //THIS FUNCTION IS CALLED, WHEN USER OPEN APP, IF LOGGED IN, GO TO FEED SCREEN
    // //WE ALSO RESET INDEX, SO USER CANT GO BACK AFTER LOGGING IN
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //user logged in
        this.props.setInfoDispatch(user.uid);
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        });
      } else {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      }
    });
  };

  //function called right when you open app
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: colors.eights,
        }}
      >
        <Plane color={colors.primary} size={48} />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInfoDispatch: (payload) => {
      dispatch({ type: "SET_INFO", payload });
    },
  };
};
export default connect(null, mapDispatchToProps)(LoadingScreen);
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
