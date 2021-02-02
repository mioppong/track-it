import {
  addItem,
  deleteItem,
  getAllItems,
  newUser,
  updateUser,
} from "./reduxFunctions";
import _ from "lodash";
import firebase from "firebase";

const CREATE_USER = "CREATE_USER";
const GET_ALL_ITEMS = "GET_ALL_ITEMS";
const UPDATE_INFO = "UPDATE_INFO";
const DELETE_ITEM = "DELETE_ITEM";
const ADD_ITEM = "ADD_ITEM";

export const initState = {
  uid: "",
  items: [],
};

initState.items = getAllItems();

const rootReducer = (state = initState, action) => {
  let newState = _.cloneDeep(state);

  if (action.type === CREATE_USER) {
    //SET USER INFORMATION HERE
    newUser();
    // newState.gang = "cool gang";
  } else if (action.type === UPDATE_INFO) {
    updateUser();
  } else if (action.type === GET_ALL_ITEMS) {
    // const result = getAllItems();
    // return result;
  } else if (action.type === DELETE_ITEM) {
    deleteItem();
  } else if (action.type === ADD_ITEM) {
    addItem();
  }
  newState.items = getAllItems();

  return newState;
};

export default rootReducer;
