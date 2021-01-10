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
export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          key: "1",
          title: "title first",
          image: "google.com image",
          description: "my cool description",
        },
        {
          key: "2",

          title: "title second",
          image: "google.second image",
          description: "my cool description",
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
        <FlatList
          key={(item) => item.key.toString()}
          style={styles.listStyles}
          data={this.state.items}
          renderItem={(item) => <EachItem data={item.item} />}
        />

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
    backgroundColor: "red",
    flex: 1,
  },
  listStyles: {
    flex: 0.8,
    margin: 10,
    padding: 10,
    backgroundColor: "green",
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
