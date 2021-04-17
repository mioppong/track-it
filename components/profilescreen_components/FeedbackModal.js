import React from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { apiKeys } from "../../config2";
import { sendGridEmail } from "react-native-sendgrid";

export default function FeedbackModal(props) {
  const [subject, setSubject] = useState();
  const [description, setDescription] = useState(null);
  const FROMEMAIL = "oppongstudios@gmail.com";
  const TOMEMAIL = "oppongstudios@gmail.com";

  const handleSendMessage = async () => {
    console.log("subject is", subject);
    console.log("description is", description);

    const sendRequest = sendGridEmail(
      apiKeys.email,
      TOMEMAIL,
      FROMEMAIL,
      subject,
      description
    );
    sendRequest
      .then((response) => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });

    props.closeModal(true);
  };

  return (
    <Modal
      style={{ backgroundColor: "#1a1a1a" }}
      animationType="slide"
      presentationStyle="pageSheet"
      visible={props.visible}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: "#1a1a1a" }}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <Text style={styles.mainText}> Thank you for your feedback</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.subjectInput}
            placeholder="subject"
            placeholderTextColor={colors.mediumGray}
            onChangeText={(text) => setSubject(text)}
          />

          <TextInput
            style={styles.description}
            multiline
            placeholder="anything you want to tell the develper :)"
            placeholderTextColor={colors.mediumGray}
            onChangeText={(text) => setDescription(text)}
          />

          <View style={styles.buttonContainer}>
            <AppButton
              iconName="close"
              iconColor="red"
              onPress={() => props.closeModal()}
            />
            <AppButton
              iconName="check"
              iconColor="lightgreen"
              onPress={() => handleSendMessage()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
  },
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  description: {
    backgroundColor: colors.eights,

    padding: 10,
    marginVertical: "5%",
    borderRadius: 20,
    alignSelf: "center",
    height: 200,
    width: "90%",
    backgroundColor: "#1c1c1c",
    color: colors.fifth,
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
  mainText: {
    marginVertical: "10%",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary,
  },
  topContainer: {
    backgroundColor: "blue",
  },
  subjectInput: {
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    height: 50,
    width: "90%",
    backgroundColor: "#1c1c1c",
    color: colors.fifth,
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
