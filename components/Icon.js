import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({ name, size = 40, iconColor = "#fff" }) {
  /*
  THIS CLASS IS USED BY APPBUTON, AND SOMETIMES I USE IT SEPARATE
  IT GETS ICONS ONLY FROM MATERIALCOMMUNITY ICONS THOUGH
;
*/

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.7} />
    </View>
  );
}

export default Icon;
