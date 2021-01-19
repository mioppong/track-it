import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
import AppButton from "../AppButton";

// THIS FUNCTION IS PASSED 2 ITEMS THEY CAN CHOOSE FROM, MENU
export default function PickerItem(props) {
  return (
    <Modal animationType="fade" transparent visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.inisdeContainer}>
          <AppButton
            iconName="camera"
            iconSize={80}
            style={styles.buttonStyle}
          />
          <AppButton
            iconName="camera-burst"
            iconSize={80}
            style={styles.buttonStyle}
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
  container: {
    flex: 1,
  },
  inisdeContainer: {
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
