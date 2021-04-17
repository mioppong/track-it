import React from "react";
import { useState } from "react";
import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import Icon from "../Icon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PickerItem from "./PickerItem";
import firebase from "firebase";
import "react-native-get-random-values";
//
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import _ from "lodash";
import { updateItem, getAllItems } from "../../reducers/reduxFunctions";

function EditItemModal({
  uid,
  visible,
  data,
  closeModal,
  updateItem,
  getAllItems,
}) {
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [actualCameraVisible, setActualCameraVisible] = useState(false);
  const [image, setImage] = useState(data.image);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const handleSaveData = () => {
    if (_.isEqualWith(image, data.image)) {
      const item = { image, title, description, key: data.key };
      updateItem({ uid: uid, key: data.key, item: item });
      getAllItems({ uid });

      closeModal();
    } else {
      uploadImage();
    }
  };
  const showCamera = () => {
    setActualCameraVisible(!actualCameraVisible);
  };

  const uploadImage = async () => {
    const fileExtension = image.split(".").pop();
    const fileName = `${nanoid()}.${fileExtension}`;

    const response = await fetch(image);
    const blob = await response.blob();

    var ref = firebase.storage().ref("/images/").child(fileName);

    ref
      .put(blob)
      .then((snapshot) => {
        return ref.getDownloadURL().then((url) => {
          const payload = { image: url, title, description, key: data.key };
          updateItem({ uid: uid, key: data.key, item: payload });
          getAllItems({ uid });
        });
      })
      .catch(() => {
        console.log("fukkk");
      });

    closeModal();
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ justifyContent: "center" }}
        >
          <View style={styles.buttonContainer}>
            <AppButton
              style={{
                alignSelf: "center",
                marginHorizontal: "5%",
                width: 60,
                height: 60,
              }}
              iconName="close"
              iconSize={60}
              iconColor="red"
              onPress={() => closeModal()}
            />
            <AppButton
              style={{
                alignSelf: "center",
                marginHorizontal: "5%",
                width: 60,
                height: 60,
              }}
              iconSize={60}
              iconName="check"
              iconColor="lightgreen"
              onPress={() => handleSaveData()}
            />
          </View>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{ uri: image }}
              imageStyle={styles.image}
              style={styles.image}
            >
              <TouchableWithoutFeedback
                onPress={() => setCameraModalVisible(true)}
              >
                <View>
                  <Icon name="camera" size={100} iconColor={colors.fifth} />
                </View>
              </TouchableWithoutFeedback>
            </ImageBackground>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: 25,
                marginVertical: 10,
                marginLeft: "1%",
                color: colors.primary,
              }}
            >
              Title:
            </Text>
            <TextInput
              onChangeText={(text) => setTitle(text)}
              value={title}
              style={styles.titleInput}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: 25,
                marginVertical: 10,
                marginLeft: "1%",
                color: colors.primary,
              }}
            >
              Description:
            </Text>
            <TextInput
              onChangeText={(text) => setDescription(text)}
              value={description}
              numberOfLines={4}
              multiline={true}
              style={styles.descriptionInput}
            />
          </View>
        </KeyboardAwareScrollView>
        {/* choose take new picture or choose from library */}
        <PickerItem
          visible={cameraModalVisible}
          closeCameraModal={() => setCameraModalVisible(false)}
          setImage={(img) => {
            setImage(img);
          }}
          actualCameraVisible={actualCameraVisible}
          makeCameraVisible={() => showCamera(true)}
          closeActualCamera={() => setActualCameraVisible(false)}
        />
      </View>
    </Modal>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateItem: (payload) => {
      dispatch(updateItem(payload));
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

export default connect(mapStateToProps, mapDispatchToProps)(EditItemModal);
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 2,
  },
  container: {
    backgroundColor: "#1a1a1a",
    flex: 1,
    justifyContent: "center",
  },
  descriptionInput: {
    color: colors.fifth,

    padding: "5%",
    backgroundColor: "#1c1c1c",
    fontSize: 15,
    fontWeight: "bold",
    height: 200,
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
  },
  imageContainer: {
    marginVertical: "2%",
    // height: "45%",
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  titleInput: {
    color: colors.fifth,

    padding: "1%",
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "#1a1a1a",
    height: 50,
    width: "90%",
    borderRadius: 15,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
