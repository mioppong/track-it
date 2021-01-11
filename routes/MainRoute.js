// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "../screens/LoadingScreen";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import WelcomeScreen from "../screens/WelcomeScreen";
import ListScreen from "../screens/ListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../config/colors";
import Icon from "../components/Icon";

const Tab = AnimatedTabBarNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      appearence={{
        floating: true,
        whenActiveShow: "both",
        whenInactive: "icon-only",
        activeTintColor: colors.mediumGray,
        inactiveTintColor: colors.darkGray,
      }}
      tabBarOptions={{
        activeBackgroundColor: colors.seventh,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ListScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="format-list-bulleted" iconColor={colors.primary} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="face-profile" iconColor={colors.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
