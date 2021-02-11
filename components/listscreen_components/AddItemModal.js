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
import uuid from "uuid/dist/v1";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import Icon from "../Icon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PickerItem from "./PickerItem";
import firebase from "firebase";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { connect } from "react-redux";

function AddItemModal({ visible, data, closeModal, addItemDispatch }) {
  data = {
    key: "12",
    title: "title second",
    image:
      "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    description: "my cool description",
  };
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [actualCameraVisible, setActualCameraVisible] = useState(false);
  const [image, setImage] = useState(data.image);
  const [imageRef, setImageRef] = useState("");
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const showCamera = () => {
    setActualCameraVisible(!actualCameraVisible);
  };

  const handleSaveData = () => {
    uploadImage();
  };
  const uploadImage = async () => {
    const fileExtension = image.split(".").pop();
    const fileName = `${nanoid()}.${fileExtension}`;

    const response = await fetch(image);
    const blob = await response.blob();
    const currentUser = firebase.auth().currentUser;

    var ref = firebase
      .storage()
      .ref()
      .child("users/" + fileName);

    ref
      .put(blob)
      .then((snapshot) => {
        return ref.getDownloadURL().then((url) => {
          const payload = { imageRef: url, title, description };
          addItemDispatch(payload);
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
                  <Icon name="camera" size={300} iconColor={colors.primary} />
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
    addItemDispatch: (payload) => {
      dispatch({ type: "ADD_ITEM", payload });
    },
  };
};

export default connect(null, mapDispatchToProps)(AddItemModal);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 2,
  },
  container: {
    backgroundColor: colors.seventh,

    flex: 1,
    justifyContent: "center",
  },
  descriptionInput: {
    padding: "5%",
    backgroundColor: colors.fifth,
    fontSize: 15,
    fontWeight: "bold",
    height: 200,
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
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
    padding: "1%",
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: colors.fifth,
    height: 50,
    width: "90%",
    borderRadius: 15,
    alignSelf: "center",
  },
});
