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
          style={{ width: 200, height: 200, borderRadius: 60 }}
          source={{
            uri:
              "https://media.tenor.com/images/973e3481caf3d8d6e48ebf18e9ca725f/tenor.gif",
          }}
        />
        <View
          style={{
            backgroundColor: "red",
            height: "100%",
            padding: "2%",
            borderRadius: 50,
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
    padding: "5%",
    width: "100%",
    backgroundColor: colors.fourth,
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
    margin: "1%",
  },
  titleContainer: {
    marginVertical: "1%",
    // backgroundColor: "red",
    height: 40,
    width: "100%",
  },
  titleStyle: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
  },
});
