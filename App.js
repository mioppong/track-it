import React from "react";
import MainRoute from "./routes/MainRoute";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);
export default function App() {
  return <MainRoute />;
}
