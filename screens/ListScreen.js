import React, { Component } from "react";
import { AnimatedAbsoluteButton } from "react-native-animated-absolute-buttons";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import EachItem from "../components/listscreen_components/EachItem";
import colors from "../config/colors";
import Screen from "../components/Screen";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          key: "1",
          title: "1111111111/1111111111/1111111111/",
          image: "license place: AVTS",
          description:
            "hello my name is michael opponghellis michael opponghello my name is michael opponghello my name is michael opponghello my name is michael opponghello my name is michael oppong google",
        },
        {
          key: "2",

          title: "toyota caravan brown",
          image: "google.second image",
          description:
            "license plate, 45hh4, driver 1: ama dokado, phone # is 416748654 and second driver",
        },
        {
          key: "3",
          title: "title first",
          image: "google.com image",
          description: "my cool description",
        },
        {
          key: "4",

          title: "title second",
          image: "google.second image",
          description: "my cool description",
        },
        {
          key: "5",
          title: "title first",
          image: "google.com image",
          description: "my cool description",
        },
        {
          key: "6",

          title: "title second",
          image: "google.second image",
          description: "my cool description",
        },
        {
          key: "7",

          title: "title second",
          image: "google.second image",
          description: "my cool description",
        },
        {
          key: "8",
          title: "title first",
          image: "google.com image",
          description: "my cool description",
        },
        {
          key: "9",

          title: "title second",
          image: "google.second image",
          description: "my cool description",
        },
        {
          key: "10",

          title: "title second",
          image: "google.second image",
          description: "my cool description",
        },
        {
          key: "11",
          title: "title first",
          image: "google.com image",
          description: "my cool description",
        },
        {
          key: "12",

          title: "title second",
          image: "google.second image",
          description: "my cool description",
        },
      ],
    };
  }

  render() {
    const buttons = [
      {
        color: "blue",
        content: <Text>+</Text>,
        action: () => firebase.auth().signOut(),
      },
      {
        color: colors.primary,
        content: <Text>🤙</Text>,
        action: () => {
          alert("You clicked!");
        },
      },
      {
        color: "green",
        content: <Text>👋</Text>,
        action: () => {
          alert("You clicked!");
        },
      },
    ];
    return (
      <Screen style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.textInput} />
        </View>
        <Text>ayee</Text>
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            key={(item) => item.key.toString()}
            style={styles.listStyles}
            data={this.state.items}
            renderItem={(item) => <EachItem data={item.item} />}
          />
        </View>

        <View style={styles.buttonContainer}>
          <AnimatedAbsoluteButton
            buttonSize={50}
            buttonColor="indigo"
            buttonShape="circular"
            buttonContent={<Text>👍</Text>}
            direction="top"
            position="bottom-right"
            positionVerticalMargin={10}
            positionHorizontalMargin={10}
            time={500}
            easing="bounce"
            buttons={buttons}
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",

    top: "85%",
    left: "85%",
    position: "absolute",
  },
  container: {
    backgroundColor: colors.eights,
    flex: 1,
  },
  listStyles: {
    flex: 0.8,
    margin: 10,
    paddingBottom: "10%",
    padding: "4%",

    // backgroundColor: "gray",
  },
  listContainer: {
    flex: 1,
    marginBottom: "20%",
    // paddingVertical: "4%",
    // backgroundColor: "green",
  },
  addItemButtomStyles: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  searchContainer: {
    width: "100%",
    height: 40,
    backgroundColor: colors.primary,
  },
  textInput: {
    width: "60%",
    height: 40,
    backgroundColor: colors.mediumGray,
  },
});
