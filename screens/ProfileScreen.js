import { firestore } from "firebase";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebase from "firebase";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleSwitch = () => {};

  render() {
    return (
      <Screen style={styles.container}>
        <Image
          source={require("../assets/magnifying-glass.png")}
          style={{
            height: 40,
            width: 40,
            alignSelf: "center",
            marginVertical: "1%",
          }}
        />
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://i.pinimg.com/originals/c1/58/84/c15884bfc3bf844b8345c5d0181d5f0a.gif",
              }}
            />
          </View>
          <View
            style={{
              padding: "1%",
              marginVertical: 10,
              flexDirection: "row",
              // backgroundColor: "red",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Dark Mode Switch</Text>
            <Switch onValueChange={this.toggleSwitch} value={true} />
          </View>
          <AppButton
            iconName="logout"
            onPress={() => firebase.auth().signOut()}
          />
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.eights,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.white,
  },
  imageContainer: {
    height: 200,
    width: "50%",
    // backgroundColor: "red",
    marginLeft: "1%",
  },
  lowerSectionContainer: {
    // backgroundColor: "blue",
    height: "100%",
    margin: "1%",
  },
});
