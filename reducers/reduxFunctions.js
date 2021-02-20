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

export const deleteItem = (payload) => {
  return async function (dispatch) {
    dispatch({ type: types.DELETE_ITEM_START });
    console.log("payload is", payload);
    const { uid, key } = payload;
    const del = firebase
      .database()
      .ref("/users/")
      .child(uid)
      .child("items")
      .child(key)
      .remove();

    dispatch({ type: types.DELETE_ITEM_SUCCESS });
  };
};

export const updateItem = (payload) => {
  return async function (dispatch) {
    const { key, uid, item } = payload;
    dispatch({ type: types.UPDATE_ITEM_START });
    console.log("INSIDE REDUX FUNCTIONS UPDATE, payloadis", payload);
    const update = await firebase
      .database()
      .ref("/users/")
      .child(uid)
      .child("items")
      .child(key)
      .update(item);

    dispatch({ type: types.UPDATE_ITEM_SUCCESS });
  };
};
