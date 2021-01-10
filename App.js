import React from "react";
import { View } from "react-native";
import EachItem from "./components/listscreen_components/EachItem";
import MainRoute from "./routes/MainRoute";
import ListScreen from "./screens/ListScreen";
import LoadingScreen from "./screens/LoadingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {
  return <MainRoute />;
}
