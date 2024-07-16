import React, { createContext, useReducer, useMemo, ReactNode, Dispatch } from 'react';

// Criando os componentes
enum StatsFilter {
  ALL = 'all',
  MONTH = 'month',
  MONEY = 'money'
}

interface StatsState {
  filter: StatsFilter;
  totalRevenue?: number;
  currentMonthRevenue?: number;
  totalOrders?: number;
  monthOrders?: number;
  averageTicket?: number;
  currentMonthAverageTicket?: number;
  totalUsers?: number;
  totalItems?: number;
  loading?: boolean;
  error?: boolean;
}

interface StatsAction {
  type: string;
  payload?: Partial<StatsState>;
}

// Estado Inicial
const initialState: StatsState = {
  filter: StatsFilter.ALL,
};

// Criando o Contexto
const StatsContext = createContext<{
  state: StatsState;
  dispatch: Dispatch<StatsAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Criando o Reducer
const statsReducer = (state: StatsState, action: StatsAction): StatsState => {
  switch (action.type) {
    case 'SET_STATS':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload?.filter ?? StatsFilter.ALL,
      };
    default:
      return state;
  }
};

// Criando o Provider
const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(statsReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

export { StatsContext, StatsProvider, StatsFilter };
