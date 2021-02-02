import firebase from "firebase";

export const getAllItems = () => {
  const currentUser = firebase.auth().currentUser;

  var data = {};
  var returningData = {};
  if (currentUser) {
    const result = firebase
      .database()
      .ref("/users/" + currentUser.uid)
      .on("value", (snapshop) => {
        data.user = snapshop;
      });
  }
  if (data.user) {
    var a = JSON.stringify(data.user);
    var result = JSON.parse(a);

    returningData = Object.values(result.items);
    console.log("returning data is", returningData);
  }

  return returningData;
};

export const newUser = () => {
  const currentUser = firebase.auth().currentUser;
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

export const addItem = () => {
  const currentUser = firebase.auth().currentUser;
  const itemObj = {
    key: "12",
    title: "DEMON TIME",
    image:
      "https://images.unsplash.com/photo-1610393813108-fc9e481ce228?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    description: "my cool description",
  };
  const ref = firebase
    .database()
    .ref("/users/" + currentUser.uid)
    .child("items")
    .push(itemObj);

  ref.update({ key: ref.key });
};

export const deleteItem = (item) => {
  const currentUser = firebase.auth().currentUser;

  const del = firebase
    .database()
    .ref("/users/" + currentUser.uid)
    .child("/items/")
    .equalTo("DEMON TIME");

  console.log("delete this", del);
};
