import { StatsState, StatsAction, StatsFilter } from './types';

export const initialState: StatsState = {
  filter: StatsFilter.ALL,
};

export const statsReducer = (state: StatsState, action: StatsAction): StatsState => {
  switch (action.type) {
    case 'GET_STATS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
