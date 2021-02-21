import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
import Icon from "../Icon";

export default function NoItemsAssociated(props) {
  return (
    <View style={styles.continer}>
      <Text style={styles.text}>No items associated with the words</Text>
      <Icon name="arrow-down-bold" size={50} iconColor={colors.darkGray} />
      <Text style={styles.query}>{props.data} </Text>
      <Icon name="emoticon-sad" iconColor={colors.primary} size={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    marginTop: 50,
    flex: 1,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  query: {
    fontWeight: "bold",
    fontSize: 30,
    color: colors.primary,
  },
});
