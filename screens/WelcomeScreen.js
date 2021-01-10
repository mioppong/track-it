import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = () => {
    console.log("handling logout");
  };

  render() {
    return (
      <Screen style={styles.container}>
        <View style={styles.topContainer}>
          <Text> Tracker </Text>
          <AppButton onPress={this.handleLogin} />
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
