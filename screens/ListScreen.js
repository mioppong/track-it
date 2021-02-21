import React, { Component } from "react";
import { AnimatedAbsoluteButton } from "react-native-animated-absolute-buttons";
import { StyleSheet, View, FlatList, TextInput, Image } from "react-native";
import EachItem from "../components/listscreen_components/EachItem";
import colors from "../config/colors";
import firebase from "firebase";
import Animated from "react-native-reanimated";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import _ from "lodash";
import NoDataComponent from "../components/listscreen_components/NoDataComponent";
import AddItemModal from "../components/listscreen_components/AddItemModal";
import { addItem, getAllItems, search } from "../reducers/reduxFunctions";
import LoadingComponent from "../components/LoadingComponent";
import NoItemsAssociated from "../components/listscreen_components/NoItemsAssociated";

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      loading: false,
      items: this.props.items,
      addItemModalVisible: false,
    };
  }

  handleSearch = (text) => {
    this.props.search({
      query: text.toLowerCase(),
      items: this.props.fullItems,
    });

    this.setState({ query: text });
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
          // this.addItem();
          this.setState({ addItemModalVisible: true });
        },
      },

      {
        color: colors.white,
        content: <AntDesign name="logout" size={24} color={colors.primary} />,

        action: () => firebase.auth().signOut(),
      },
    ];

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
            placeholder="What Item DO you want to search for crodie??"
            style={styles.textInput}
            onChangeText={(text) => this.handleSearch(text)}
          />
        </Animated.View>

        {/* if list is not empty */}
        {!_.isEmpty(this.props.fullItems) ? (
          <FlatList
            ListEmptyComponent={<NoItemsAssociated data={this.state.query} />}
            scrollEventThrottle={10}
            alwaysBounceVertical={false}
            bounces={false}
            contentContainerStyle={{
              paddingBottom: 20,
              paddingTop: HEADER_HEIGHT,
            }}
            key={(item) => item.key + "bow"}
            style={styles.listStyles}
            data={this.props.items}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            renderItem={(item) => <EachItem data={item.item} />}
          />
        ) : null}

        {_.isEmpty(this.props.items) && this.props.loading && (
          <LoadingComponent />
        )}

        {this.props.noData && !this.props.loading && <NoDataComponent />}

        <AddItemModal
          visible={this.state.addItemModalVisible}
          closeModal={() => this.setState({ addItemModalVisible: false })}
        />

        {/* {isDataEmpty && <NoDataComponent />} */}
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
    loading: state.loading,
    noData: state.noData,
    fullItems: state.fullItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: (payload) => {
      dispatch(getAllItems(payload));
    },
    createUser: () => {
      dispatch({ type: "CREATE_USER" });
    },
    deleteItemDispatch: () => {
      dispatch({ type: "DELETE_ITEM" });
    },
    addItem: (payload) => {
      dispatch(addItem(payload));
    },
    search: (payload) => {
      dispatch(search(payload));
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
