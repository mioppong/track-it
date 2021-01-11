// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "../screens/LoadingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/WelcomeScreen";
import ListScreen from "../screens/ListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../config/colors";
import Icon from "../components/Icon";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: colors.primary,
        style: {
          padding: 20,
          backgroundColor: colors.white,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
          borderRadius: 120,
          marginBottom: 25,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ListScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={60} />
          ),
        }}
      />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createStackNavigator();
function MainRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainRoute;
