import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Plane } from "react-native-animated-spinkit";
import colors from "../config/colors";

export default function LoadingComponent() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Plane color={colors.primary} size={48} />
    </View>
  );
}

const styles = StyleSheet.create({});
