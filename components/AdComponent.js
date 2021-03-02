import { AdMobBanner } from "expo-ads-admob";
import React from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";
import { apiKeys } from "../config2";
import Icon from "./Icon";

export default function AdComponent() {
  const bannerError = (e) => {
    console.log(e);
  };
  return (
    <View style={styles.container}>
      <View style={styles.aboveAd}>
        <Text style={styles.text}>click this to help support :)</Text>

        <Icon name="arrow-down" size={50} iconColor={colors.primary} />
      </View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={
          Platform.OS == "ios" ? apiKeys.iosAdBanner : apiKeys.androidAdBanner
        }
        servePersonalizedAds={false}
        onDidFailToReceiveAdWithError={(e) => bannerError(e)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  aboveAd: {
    alignItems: "center",
  },
  container: {
    padding: 10,
    marginVertical: "20%",
    borderWidth: 1,
    borderRadius: 20,
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
