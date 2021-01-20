import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

// THIS FUNCTION IS PASSED 2 ITEMS THEY CAN CHOOSE FROM, MENU
export default function PickerItem(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  let camera;
  const passImageToEdit = (imgUri) => {
    props.setImage(imgUri);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
        const camera_ = await Camera.requestPermissionsAsync();
        setHasPermission(camera_.status === "granted");
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
      // setImage(result.uri);
      passImageToEdit(result.uri);
    }
  };

  const snap = async () => {
    if (camera) {
      const result = await camera.takePictureAsync();
      passImageToEdit(result.uri);
    }
  };
  return (
    <>
      <Modal animationType="fade" transparent visible={props.visible}>
        <View style={styles.cameraModalContainer}>
          <View style={styles.inisdeCameraModalContainer}>
            <AppButton
              iconName="camera"
              iconSize={80}
              style={styles.buttonStyle}
            />

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

      <Modal animationType="slide" visible={props.actualCameraVisible}>
        <Camera
          ref={(ref) => {
            camera = ref;
          }}
          style={styles.camera}
          type={type}
        >
          <View style={styles.buttonContainer}>
            <AppButton
              style={styles.buttonStyle}
              iconName="camera-retake"
              iconSize={60}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
            <AppButton
              style={styles.buttonStyle}
              iconName="camera"
              iconSize={60}
              onPress={() => snap()}
            />

            <AppButton
              style={styles.buttonStyle}
              iconName="close"
              iconColor="red"
              iconSize={75}
              onPress={() => {
                console.log("trying croo");
                props.closeActualCamera();
              }}
            />
          </View>
        </Camera>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: "40%",
    width: "50%",
    backgroundColor: "red",
    alignSelf: "flex-end",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginTop: "auto",
  },
  cameraModalContainer: {
    flex: 1,
    backgroundColor: "rgba(1,1,1,0.5);",
  },
  camera: {
    flex: 1,
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
