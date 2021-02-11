import firebase from "firebase/app";
import "firebase/firestore";
const currentUser = firebase.auth().currentUser;
const getUID = async () => {
  var uid = firebase.auth().currentUser.uid;

  return uid;
};

export const getAllItems = async () => {
  const currentUser = await firebase.auth().currentUser;

  const eventRef = firebase.database().ref("/users/" + currentUser.uid);
  const snapshot = await eventRef.once("value");
  const value = snapshot.val();

  var a = JSON.stringify(value);
  var result_ = JSON.parse(a);
  const returningData = Object.values(result_.items);

  return returningData;
};

export const newUser = () => {
  const itemObj = {
    key: "12",
    title: "title second",
    image:
      "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    description: "my cool description",
  };
  console.log("creating new user cro");
  firebase
    .database()
    .ref("/users/" + currentUser.uid)
    .child("items")
    .push(itemObj);
};

export const updateUser = () => {
  //   firebase
  //     .database()
  //     .ref("/users/" + result.user.uid)
  //     .update({
  //       last_loggedin: Date.now(),
  //       profile_picture: result.additionalUserInfo.profile.picture,
  //     });
  console.log("updating user crodie");
};

export const addItem = (payload) => {
  const ref = firebase
    .database()
    .ref("/users/" + currentUser.uid)
    .child("items")
    .push(payload);

  ref.update({ key: ref.key });
};

export const addItemFireStore = async (payload) => {
  const response = await firebase
    .firestore()
    .collection("users")
    .doc("1")
    .add(payload);

  console.log("response is", response);
  // ref.update({ key: ref.key });
};

export const deleteItem = (item) => {
  const del = firebase
    .database()
    .ref("/users/" + currentUser.uid)
    .child("/items/")
    .equalTo("DEMON TIME");

  console.log("delete this", del);
};
