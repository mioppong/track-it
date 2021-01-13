import React, { Component } from "react";
import { AnimatedAbsoluteButton } from "react-native-animated-absolute-buttons";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import EachItem from "../components/listscreen_components/EachItem";
import colors from "../config/colors";
import Screen from "../components/Screen";
import firebase from "firebase";
import AppButton from "../components/AppButton";
import Animated from "react-native-reanimated";
import Icon from "../components/Icon";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          key: "1",
          title: "1111111111/1111111111/1111111111/",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description:
            "hello my name is michael opponghellis michael opponghello my name is michael opponghello my name is michael opponghello my name is michael opponghello my name is michael oppong google",
        },
        {
          key: "2",

          title: "toyota caravan brown",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description:
            "license plate, 45hh4, driver 1: ama dokado, phone # is 416748654 and second driver",
        },
        {
          key: "3",
          title: "title first",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
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
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description: "my cool description",
        },
        {
          key: "6",

          title: "title second",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description: "my cool description",
        },
        {
          key: "7",

          title: "title second",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description: "my cool description",
        },
        {
          key: "8",
          title: "title first",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description: "my cool description",
        },
        {
          key: "9",

          title: "title second",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description: "my cool description",
        },
        {
          key: "10",

          title: "title second",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description: "my cool description",
        },
        {
          key: "11",
          title: "title first",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description: "my cool description",
        },
        {
          key: "12",

          title: "title second",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          description: "my cool description",
        },
      ],
    };
  }

  render() {
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 120);
    const translateY = Animated.interpolate(diffClamp, {
      inputRange: [0, 120],
      outputRange: [0, -120],
    });
    const buttons = [
      {
        color: colors.lightGray,
        content: <Ionicons name="ios-add" size={40} color={colors.primary} />,
        action: () => firebase.auth().signOut(),
      },

      {
        color: colors.white,
        content: <AntDesign name="logout" size={24} color={colors.primary} />,
        action: () => {
          alert("You clicked!");
        },
      },
    ];
    // styles.searchContainer,
    return (
      <Screen style={styles.container}>
        <Animated.View
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            width: "100%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            // backgroundColor: "red",
            padding: 20,
            transform: [{ translateY }],
            zIndex: 1,
          }}
        >
          <TextInput
            placeholder="What Item DO you want to search for crodie?"
            style={styles.textInput}
          />

          <AppButton
            style={styles.searchButtonStyle}
            iconName="cloud-search-outline"
          />
        </Animated.View>

        <Image
          source={require("../assets/magnifying-glass.png")}
          style={{
            height: 40,
            width: 40,
            // backgroundColor: "red",
            position: "absolute",
            top: 0,
            left: "42%",
          }}
        />

        <View style={styles.listContainer}>
          <FlatList
            alwaysBounceVertical={false}
            bounces={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            key={(item) => item.key.toString()}
            style={styles.listStyles}
            data={this.state.items}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            renderItem={(item) => <EachItem data={item.item} />}
          />
        </View>

        <View style={styles.buttonContainer}>
          <AnimatedAbsoluteButton
            buttonSize={50}
            buttonColor="indigo"
            buttonShape="circular"
            buttonContent={
              <Image
                source={require("../assets/magnifying-glass.png")}
                style={{
                  height: 60,
                  width: 60,
                }}
              />
            }
            direction="top"
            position="bottom-right"
            positionVerticalMargin={15}
            positionHorizontalMargin={15}
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

    top: "80%",
    left: "90%",
    position: "absolute",
  },
  container: {
    backgroundColor: colors.eights,
    flex: 1,
  },
  listStyles: {
    flex: 1,
    margin: 10,
    paddingBottom: "10%",
    padding: "4%",

    // backgroundColor: "gray",
  },
  listContainer: {
    marginTop: "10%",
    flex: 1,
    // height: "100%",
    marginBottom: "18%",
    // paddingVertical: "4%",
    // backgroundColor: "green",
  },
  searchButtonStyle: { marginHorizontal: 10, marginTop: 0 },
  addItemButtomStyles: {
    fontSize: 40,
    fontWeight: "bold",
  },
  searchContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: "red",
    padding: 20,
  },
  textInput: {
    width: "85%",
    borderRadius: 20,
    height: 40,
    backgroundColor: colors.lightGray,
    padding: "1%",
  },
});
