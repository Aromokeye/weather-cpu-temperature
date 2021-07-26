/* eslint-disable import/prefer-default-export */
import { ITempAction } from './Reducer';
import { getCurrentWeather } from '../Service/Weather.Service';
import { getCPUTemperature } from '../SystemInfo/CPUTemperature';

// a utility function for populating lists in the state

export const weatherDispatch = (dispatch: React.Dispatch<ITempAction>) => {
  getCurrentWeather(
    'https://api.openweathermap.org/data/2.5/weather?q=London&appid=a73f46b0282c3c8e70c2245647b59a32'
  )
    .then((res) => {
      return dispatch({ type: 'GET_WEATHER_TEMPERATURE', payload: res });
    })
    .catch((error) => {
      return dispatch({ type: 'SET_ERROR', payload: error });
    });
};

export const cpuDispatch = (dispatch: React.Dispatch<ITempAction>) => {
  getCPUTemperature()
    .then((res) => {
      return dispatch({ type: 'GET_CPU_TEMPERATURE', payload: res });
    })
    .catch((error) => {
      return dispatch({ type: 'SET_ERROR', payload: error });
    });
};
