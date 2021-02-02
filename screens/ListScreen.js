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
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import _ from "lodash";
import { getData, contains } from "../api";
import NoDataComponent from "../components/listscreen_components/NoDataComponent";

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      loading: false,
      items: [],
      fullItems: [],
    };
  }

  componentDidMount() {
    this.props.getItems();
    this.makeRemoteRequest();
  }

  addItem = () => {
    this.props.addItemDispatch();
    // this.props.deleteItemDispatch();
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });

    const result = getData();
    this.setState({
      loading: false,
      items: result,
      fullItems: result,
    });
  };

  handleSearch = (text) => {
    this.setState({ query: text });
    const formattedQuery = text.toLowerCase();

    //this filter takes al the thingsin full items, and
    //checks if the key word is in them
    const items = _.filter(this.state.fullItems, (items) => {
      return contains(items, formattedQuery);
    });

    this.setState({ query: formattedQuery, items });
  };
  render() {
    const HEADER_HEIGHT = 70;
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
    const headerY = Animated.interpolate(diffClamp, {
      inputRange: [0, HEADER_HEIGHT - 20],
      outputRange: [0, -HEADER_HEIGHT],
    });
    const buttons = [
      {
        color: colors.lightGray,
        content: <Ionicons name="ios-add" size={40} color={colors.primary} />,
        action: () => {
          this.addItem();
        },
      },

      {
        color: colors.white,
        content: <AntDesign name="logout" size={24} color={colors.primary} />,

        action: () => firebase.auth().signOut(),
      },
    ];
    // styles.searchContainer,
    console.log(
      "DO WE HAVE AN EMPTY ARRAY",
      Object.keys(this.props.items).length === 0
    );
    const isDataEmpty = Object.keys(this.props.items).length === 0;
    console.log("DO WE HAVE AN EMPTY", this.props.items);
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            top: 0,
            left: 0,
            right: 0,
            marginTop: "5%",
            position: "absolute",
            width: "100%",
            height: 100,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            transform: [{ translateY: headerY }],
            zIndex: 1000,
            elevation: 1000,
          }}
        >
          <TextInput
            placeholder="What Item DO you want to search for crodie?"
            style={styles.textInput}
            onChangeText={(text) => this.handleSearch(text)}
          />
        </Animated.View>

        {!isDataEmpty && (
          <FlatList
            scrollEventThrottle={10}
            alwaysBounceVertical={false}
            bounces={false}
            contentContainerStyle={{
              paddingBottom: 20,
              paddingTop: HEADER_HEIGHT,
            }}
            key={(item) => item.key + ""}
            style={styles.listStyles}
            data={this.props.items}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            renderItem={(item) => <EachItem data={item.item} />}
          />
        )}

        {isDataEmpty && <NoDataComponent />}
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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    uid: state.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: () => {
      dispatch({ type: "GET_ALL_DATA" });
    },
    createUser: () => {
      dispatch({ type: "CREATE_USER" });
    },
    deleteItemDispatch: () => {
      dispatch({ type: "DELETE_ITEM" });
    },
    addItemDispatch: () => {
      dispatch({ type: "ADD_ITEM" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);

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
    padding: "2%",
    marginBottom: "18%",

    // backgroundColor: "gray",
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
    width: "100%",
    borderRadius: 20,
    height: 40,
    backgroundColor: colors.lightGray,
    padding: "2%",
  },
});
