/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'react';

// create

export interface ITempState {
  weatherTemperatureList: any[];
  cpuTemperatureList: any[];
  error: any;
}

export interface ITempAction {
  type: string;
  payload?: any;
}

export const INITIAL_STATE: ITempState = {
  weatherTemperatureList: [],
  cpuTemperatureList: [],
  error: null,
};

const temperatureReducer: Reducer<ITempState, ITempAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'GET_CPU_TEMPERATURE':
      return {
        ...state,
        cpuTemperatureList: [...state.cpuTemperatureList, action.payload],
        error: null,
      };
    case 'GET_WEATHER_TEMPERATURE':
      return {
        ...state,
        weatherTemperatureList: [
          ...state.weatherTemperatureList,
          action.payload,
        ],
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        weatherTemperatureList: [],
        cpuTemperatureList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default temperatureReducer;
