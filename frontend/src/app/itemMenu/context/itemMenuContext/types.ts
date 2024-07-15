import RequestStatus from "../../../../shared/types/request-status";
import ItemMenuModel from "../../models/ItemMenuModel";
import { ReactNode } from "react";
import ItemMenuService from "./service";

export type ItemMenuStateAction =
  | {
      type: ItemMenuStateType.GET_ALL;
      payload: RequestStatus<ItemMenuModel[]>;
    }
  | {
      type: ItemMenuStateType.GET;
      payload: RequestStatus<ItemMenuModel>;
    }

export interface ItemMenuState {
  getItemRequestStatus: RequestStatus<ItemMenuModel>;  
  getItemsRequestStatus: RequestStatus<ItemMenuModel[]>;
}

export enum ItemMenuStateType {
  GET = "CHANGE_GET_ITEM_REQUEST_STATUS",
  GET_ALL = "CHANGE_GET_ITEMS_REQUEST_STATUS",
}

export interface ItemMenuProviderProps {
  children: ReactNode;
}

export interface ItemMenuContextProps {
  state: ItemMenuState;
  prevState?: ItemMenuState;
  service: ItemMenuService;
}
