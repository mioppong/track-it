import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
import Icon from "../Icon";

export default function NoDataComponent() {
  return (
    <View style={styles.container}>
      <Icon size={100} iconColor={colors.primary} name="emoticon-sad-outline" />
      <Text style={styles.text}>THERES NO DATA fam</Text>
      <Text style={styles.text}> USE THAT BUTTON TO ADD CONTENT</Text>
      <Icon size={100} iconColor={colors.primary} name="arrow-bottom-right" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: "5%",
    fontWeight: "bold",
    fontSize: 20,
  },
});
