import firebase from "firebase/app";
import { firebaseConfig } from "../config";
import "firebase/firestore";
import types from "./types";
import _ from "lodash";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const getAllItems = (payload) => {
  const { uid } = payload;
  return async function (dispatch) {
    dispatch({ type: types.GET_ALL_ITEMS_START });

    const eventRef = firebase
      .database()
      .ref("/users/")
      .child(uid)
      .child("items");
    const snapshot = await eventRef.once("value");
    const value = snapshot.val();

    if (!_.isEmpty(value)) {
      var myData = Object.keys(value).map((key) => {
        return value[key];
      });
      const items = Object.values(myData);

      dispatch({ type: types.GET_ALL_ITEMS_SUCCESS, data: items });
    } else {
      dispatch({ type: types.NO_DATA_AVAILABLE });
    }
  };
};

export const newUser = (uid) => {
  return function (dispatch) {
    dispatch({ type: "SET_INFO_START" });

    dispatch({ type: types.SET_INFO_SUCCESS, payload: uid });
  };
};

export const addItem = (payload) => {
  return async function (dispatch) {
    const itemObj = {
      key: "12",
      title: "title second",
      image:
        "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
      description: "my cool description",
    };
    const { uid, item } = payload;

    console.log("uid we get in add obj", uid);
    const ref = await firebase
      .database()
      .ref("/users/")
      .child(uid)
      .child("items")
      .push(item);

    await ref.update({ key: ref.key });

    dispatch({ type: types.ADD_ITEM_SUCCESS });
  };
};

export const deleteItem = (item) => {
  const del = firebase
    .database()
    .ref("/users/" + currentUser.uid)
    .child("/items/")
    .equalTo("DEMON TIME");

  console.log("delete this", del);
};
