import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import colors from "../../config/colors";
import { deleteItem, getAllItems } from "../../reducers/reduxFunctions";
import AppButton from "../AppButton";
import EditItemModal from "./EditItemModal";

function EachItem({ data, deleteItem, uid, getAllItems }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    deleteItem({ uid, key: data.key });
    getAllItems({ uid });
  };
  const leftSwipe = () => {
    return (
      <AppButton
        iconName="delete"
        style={{ alignSelf: "center", marginHorizontal: 15 }}
        onPress={() => handleDelete()}
      />
    );
  };

  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 260,
                height: 200,
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
                backgroundColor: colors.fifth,
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
    backgroundColor: colors.seventh,
    marginVertical: "5%",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  descriptionStyle: {
    padding: "1%",
    margin: "1%",
    fontWeight: "bold",

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
  },
});
