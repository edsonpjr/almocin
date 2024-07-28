import { createContext, useReducer, useMemo } from "react";
import LoginService from "./service";
import loginStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";
import { LoginContextProps, LoginProviderProps } from "./types";

export const LoginContext = createContext<LoginContextProps>(
  {} as LoginContextProps
);

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [state, dispatch] = useReducer(loginStateReducer, {
    loginRequestStatus: RequestStatus.idle(),
    logoutRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);

  const service = useMemo(
    () =>
      new LoginService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <LoginContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
