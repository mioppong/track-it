import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Dimensions } from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { connect } from "react-redux";
import colors from "../../config/colors";
import { deleteItem, getAllItems } from "../../reducers/reduxFunctions";
import AppButton from "../AppButton";
import EditItemModal from "./EditItemModal";

function EachItem({
  data,
  deleteItem,
  uid,
  getAllItems,
  showFullImage,
  saveImage,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleDelete = () => {
    deleteItem({ uid, key: data.key, data });
    getAllItems({ uid });
  };

  const openTwoButtonAlert = () => {
    Alert.alert(
      "Are you sure you want to delete this!",
      "It will be gone forever",

      [
        { text: "Yes", onPress: () => handleDelete() },
        {
          text: "No",
          onPress: () => console.log("No button clicked"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleDownload = () => {
    saveImage(data.image);
  };

  const handleShow = () => {
    Image.getSize(data.image, (widths, heights) => {
      setHeight(heights);
      setWidth(widths);
    });
    const maxHeight = Dimensions.get("window").height; // or something else
    const maxWidth = Dimensions.get("window").width;

    const ratio = Math.min(maxWidth / width, maxHeight / height);

    showFullImage(width * ratio, height * ratio, data.image);
    // setImageModal(true);
  };

  const leftSwipe = () => {
    return (
      <AppButton
        iconName="delete"
        style={{ alignSelf: "center", marginHorizontal: 15 }}
        onPress={() => openTwoButtonAlert()}
      />
    );
  };

  const rightSwipe = () => {
    return (
      <>
        <AppButton
          iconName="eye"
          style={{ alignSelf: "center", marginHorizontal: 15 }}
          onPress={() => handleShow()}
        />

        <AppButton
          iconName="download"
          style={{ alignSelf: "center", marginHorizontal: 15 }}
          onPress={() => handleDownload()}
        />
      </>
    );
  };

  return (
    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                flex: 1,
                margin: "2%",
              }}
              source={{
                uri: data.image,
              }}
            />
            <View
              style={{
                margin: "2%",
                flex: 0.5,
                backgroundColor: "#1c1c1c",
                height: 201,
                width: "35%",
                padding: "5%",
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
            >
              <Text style={styles.descriptionStyle}>{data.description}</Text>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{data.title}</Text>
          </View>

          <EditItemModal
            visible={modalVisible}
            data={data}
            closeModal={() => setModalVisible(false)}
          />
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (payload) => {
      dispatch(deleteItem(payload));
    },
    getAllItems: (payload) => {
      dispatch(getAllItems(payload));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    uid: state.uid,
    loading: state.loading,
    noData: state.noData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EachItem);

const styles = StyleSheet.create({
  container: {
    padding: "0.5%",
    width: "100%",
    backgroundColor: "#1a1a1a",
    marginVertical: "5%",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  descriptionStyle: {
    padding: "1%",
    margin: "1%",
    fontWeight: "bold",
    color: colors.fifth,

    // backgroundColor: "green",

    flexShrink: 1,
  },
  titleContainer: {
    marginVertical: "1%",
    // backgroundColor: "red",
    height: 40,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    color: colors.fifth,
  },
});
