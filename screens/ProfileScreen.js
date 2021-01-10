import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";

export default class ProfileScreen extends Component {
  render() {
    return (
      <Screen style={styles.container}>
        <Text> ProfileScreen </Text>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.eights,
  },
});
