import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../Screen";
export default function EachItem({ data }) {
  console.log("the data we get is", data);
  return (
    <Screen style={styles.container}>
      <Text>{data.title}</Text>
      <Text>{data.image}</Text>
      <Text>{data.description}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "blue",
    marginTop: "10%",
  },
});
