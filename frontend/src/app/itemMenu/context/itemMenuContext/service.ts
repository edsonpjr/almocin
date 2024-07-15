import { Dispatch } from "react";
import { ItemMenuStateAction, ItemMenuStateType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import RequestStatus from "../../../../shared/types/request-status";
import ItemMenuModel from "../../models/ItemMenuModel";

export default class ItemMenuService {
  private apiService: ApiService;
  private dispatch: Dispatch<ItemMenuStateAction>;
  private prefix = "/menu";

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<ItemMenuStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async getItem(id: string): Promise<void> {
    this.dispatch({
      type: ItemMenuStateType.GET,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.get(`${this.prefix}/${id}`);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: ItemMenuStateType.GET,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: ItemMenuStateType.GET,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getItems(): Promise<void> {
    try {
      this.dispatch({
        type: ItemMenuStateType.GET_ALL,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(this.prefix);

      result.handle({
        onSuccess: (response) => {
          const responseData = response.data.map(
            (category: ItemMenuModel) => category
          );

          this.dispatch({
            type: ItemMenuStateType.GET_ALL,
            payload: RequestStatus.success(responseData),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: ItemMenuStateType.GET_ALL,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: ItemMenuStateType.GET_ALL,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}
