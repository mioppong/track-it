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
export default function EditItemModal({ visible, data, onPress }) {
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [actualCameraVisible, setActualCameraVisible] = useState(false);
  const [image, setImage] = useState(data.image);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const showCamera = () => {
    setActualCameraVisible(!actualCameraVisible);
  };

  const uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("users/user1" + "img1.png");

    ref
      .put(blob)
      .then(() => {
        console.log("works G");
      })
      .catch(() => {
        console.log("fukkk");
      });
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
              onPress={() => onPress()}
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
              onPress={() => uploadImage()}
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
            <TextInput value={title} style={styles.titleInput} />
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