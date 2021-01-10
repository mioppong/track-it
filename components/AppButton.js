import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";
import Icon from "./Icon";

function AppButton({
  style,
  iconSize,
  title,
  onPress,
  iconName,
  iconColor,
  textStyle,
}) {
  /*
  THIS CLASS RETURNS THE BUTTON YOU SEE EVERYWHERE IN THE APP,
  COOL COMPONENT
*/

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {iconName && (
        <Icon size={iconSize} name={iconName} iconColor={iconColor} />
      )}
      {title && <Text style={[styles.text, textStyle]}> {title} </Text>}
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    marginTop: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: colors.fourth,
    margin: -5,
  },
});
