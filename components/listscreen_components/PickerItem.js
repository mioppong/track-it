import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, Image } from "react-native";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import * as ImagePicker from "expo-image-picker";

// THIS FUNCTION IS PASSED 2 ITEMS THEY CAN CHOOSE FROM, MENU
export default function PickerItem(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <Modal animationType="fade" transparent visible={props.visible}>
      <View style={styles.cameraModalContainer}>
        <View style={styles.inisdeCameraModalContainer}>
          <AppButton
            iconName="camera"
            iconSize={80}
            style={styles.buttonStyle}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}

          <AppButton
            iconName="camera-burst"
            iconSize={80}
            style={styles.buttonStyle}
            onPress={pickImage}
          />

          <AppButton
            title="Cancel"
            textStyle={{ color: colors.darkGray, fontWeight: "bold" }}
            style={styles.buttonStyle}
            onPress={() => props.closeCameraModal()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cameraModalContainer: {
    flex: 1,
    backgroundColor: "rgba(1,1,1,0.5);",
  },
  inisdeCameraModalContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    height: "50%",
    width: "60%",
    alignSelf: "center",
    marginTop: "auto",
    // backgroundColor: "red",
  },
  buttonStyle: {
    width: 80,
    height: 80,
  },
});
