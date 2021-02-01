import React from "react";
import MainRoute from "./routes/MainRoute";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import logger from "redux-logger";
//WE NEED THIS LINE TO BE ABLE TO HAVE REDUX
const store = createStore(rootReducer, applyMiddleware(logger));

export default function App() {
  return (
    <Provider store={store}>
      <MainRoute />
    </Provider>
  );
}
