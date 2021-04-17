import React from "react";
import MainRoute from "./routes/MainRoute";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { createLogger } from "redux-logger";

//secure storage / idk what that means really
const storage = createSecureStore();

const config = {
  key: "root",
  storage,
  whitelist: ["rootReducer"],
};

const persistedReducer = persistReducer(config, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, createLogger())
);

const persistedStore = persistStore(store);
//WE NEED THIS LINE TO BE ABLE TO HAVE REDUX

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <MainRoute />
      </PersistGate>
    </Provider>
  );
}
