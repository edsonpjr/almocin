import { createContext, useReducer, useMemo } from "react";
import ItemMenuService from "./service";
import menuStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";
import { ItemMenuContextProps, ItemMenuProviderProps } from "./types";

export const ItemMenuContext = createContext<ItemMenuContextProps>(
  {} as ItemMenuContextProps
);

export const ItemMenuProvider = ({ children }: ItemMenuProviderProps) => {
  const [state, dispatch] = useReducer(menuStateReducer, {
    getItemRequestStatus: RequestStatus.idle(),
    getItemsRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new ItemMenuService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <ItemMenuContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </ItemMenuContext.Provider>
  );
};