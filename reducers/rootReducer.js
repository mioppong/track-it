import _ from "lodash";
import types from "./types";

export const initState = {
  uid: "",
  items: [],
  fullItems: [],
  totalItems: 0,
  noData: true,
  loading: false,
};

// initState.items = getAllItems();

const rootReducer = (state = initState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case types.SET_INFO_START:
      newState.loading = true;
      return newState;
    case types.SET_INFO_SUCCESS:
      newState.uid = action.payload;
      newState.loading = false;
      return newState;

    case types.GET_ALL_ITEMS_START:
      newState.loading = true;
      return newState;
    case types.GET_ALL_ITEMS_SUCCESS:
      newState.loading = false;
      newState.noData = false;
      newState.items = action.data;
      newState.fullItems = action.data;
      newState.totalItems = action.totalItems;
      return newState;

    case types.ADD_ITEM_START:
      newState.loading = true;
      return newState;
    case types.ADD_ITEM_SUCCESS:
      newState.loading = false;
      return newState;

    case types.UPDATE_ITEM_START:
      newState.loading = true;
      return newState;
    case types.UPDATE_ITEM_SUCCESS:
      newState.loading = false;
      return newState;

    case types.SEARCHING:
      newState.items = action.data;
      return newState;

    case types.NO_DATA_AVAILABLE:
      newState.items = [];
      newState.loading = false;
      newState.noData = true;
      newState.totalItems = 0;
      return newState;
  }

  return newState;
};

export default rootReducer;
