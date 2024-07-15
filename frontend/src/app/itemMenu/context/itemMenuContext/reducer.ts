import { ItemMenuState, ItemMenuStateAction, ItemMenuStateType } from "./types";

const menuStateReducer = (state: ItemMenuState, action: ItemMenuStateAction) => {
  switch (action.type) {
    case ItemMenuStateType.GET:
      return {
        ...state,
        getItemRequestStatus: action.payload,
      };
    case ItemMenuStateType.GET_ALL:
      return {
        ...state,
        getItemsRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default menuStateReducer;