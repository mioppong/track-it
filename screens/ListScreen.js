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
import { getData, contains } from "../api";
import NoDataComponent from "../components/listscreen_components/NoDataComponent";
import AddItemModal from "../components/listscreen_components/AddItemModal";
import { addItem, getAllItems } from "../reducers/reduxFunctions";
import LoadingComponent from "../components/LoadingComponent";

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      loading: false,
      items: [
        {
          description: "my cool description",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          key: "12121",
          title: "title second",
        },
        {
          description: "my cool description",
          imageRef:
            "https://firebasestorage.googleapis.com/v0/b/tracker-3e334.appspot.com/o/images%2F3whQUG3iWFAWivOCsCcUd.jpg?alt=media&token=dd8f91ee-d5d5-4dc3-bd54-43fd9a6d8cf8",
          key: "-MTb_eX0K4Vq0oB_qAER",
          title: "title second",
        },
        {
          description: "my cool description",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          key: "dsfsdf",
          title: "title second",
        },
        {
          description: "my cool description",
          image:
            "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          key: "dsdfsdfs",
          title: "title second",
        },
      ],
      fullItems: [],
      addItemModalVisible: false,
    };
  }

  addItem = () => {
    this.props.addItem();
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
    // styles.searchContainer,

    // const isDataEmpty = this.props.items.length > 0 ? false : true;
    // Object.keys(this.props.items).length === 0;
    // console.log("DO WE HAVE AN EMPTY", this.props.items);
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
        {!_.isEmpty(this.props.items) ? (
          <FlatList
            ListEmptyComponent="empty"
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

        {/* {!this.props.items && <NoDataComponent />} */}
        {/* <EachItem data={item.item} /> */}
        {/* <AppButton
          style={{ height: 200, width: 200 }}
          onPress={() => this.props.addItem({ uid: this.props.uid, item: {} })}
        />
        <AppButton
          style={{ height: 200, width: 200, backgroundColor: "green" }}
          onPress={() =>
            this.props.getAllItems({
              type: "GET_ALL_ITEMS",
              uid: this.props.uid,
            })
          }
        /> */}

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
