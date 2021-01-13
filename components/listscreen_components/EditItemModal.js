import React from "react";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import Icon from "../Icon";

export default function EditItemModal({ visible, data, onPress }) {
  const handleChangeImage = () => {
    console.log("handling image change");
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <AppButton
          style={{ alignSelf: "center" }}
          iconName="close"
          onPress={() => onPress()}
        />

        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: data.image }}
            imageStyle={styles.image}
            style={styles.image}
          >
            <TouchableWithoutFeedback onPress={() => handleChangeImage()}>
              <Icon name="camera" size={100} iconColor={colors.primary} />
            </TouchableWithoutFeedback>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.seventh,
    flex: 1,
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
    height: "60%",
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
});
