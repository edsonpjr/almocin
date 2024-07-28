import RequestStatus from "../../../../shared/types/request-status";
import { ReactNode } from "react";
import OrderService from "./service";
import { Order } from "../../../../shared/types/order";

export type OrderStateAction =
  | {
      type: OrderStateType.CREATE;
      payload: RequestStatus<string>;
    }
  | {
      type: OrderStateType.GET_ALL;
      payload: RequestStatus<Order[]>;
    }
  | {
      type: OrderStateType.UPDATE;
      payload: RequestStatus<string>;
    };

export interface OrderState {
  createOrderRequestStatus: RequestStatus<string>;
  updateOrderRequestStatus: RequestStatus<string>;
  getOrdersRequestStatus: RequestStatus<Order[]>;
}

export enum OrderStateType {
  CREATE = "CHANGE_CREATE_ORDER_REQUEST_STATUS",
  UPDATE = "CHANGE_UPDATE_ORDER_REQUEST_STATUS",
  GET_ALL = "CHANGE_GET_ORDERS_REQUEST_STATUS",
}

export interface OrderProviderProps {
  children: ReactNode;
}

export interface OrderContextProps {
  state: OrderState;
  prevState?: OrderState;
  service: OrderService;
}
