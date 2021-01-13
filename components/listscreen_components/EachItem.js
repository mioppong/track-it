import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../../config/colors";
import Screen from "../Screen";
export default function EachItem({ data }) {
  console.log("the data we get is", data);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: 260,
            height: 200,
            borderRadius: 20,
            flex: 1,
            margin: "2%",
          }}
          source={{
            uri:
              "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          }}
        />
        <View
          style={{
            margin: "2%",
            flex: 0.5,
            backgroundColor: colors.fifth,
            height: 201,
            width: "35%",
            padding: "5%",
            borderRadius: 20,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,

            elevation: 12,
          }}
        >
          <Text style={styles.descriptionStyle}>{data.description}</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>{data.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "0.5%",
    width: "100%",
    backgroundColor: colors.seventh,
    marginVertical: "5%",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  descriptionStyle: {
    padding: "1%",
    margin: "1%",
    fontWeight: "bold",

    // backgroundColor: "green",

    flexShrink: 1,
  },
  titleContainer: {
    marginVertical: "1%",
    // backgroundColor: "red",
    height: 40,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
  },
});
