/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState, useReducer, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './App.global.css';
import temperatureReducer, { INITIAL_STATE } from './Store/Reducer';
import { weatherDispatch, cpuDispatch } from './Store/DispatchFunctions';
import Home from './components/Home/Home';
import HeaderItem from './components/Header/HeaderItem';
import Chart from './components/Chart/Chart';
import Correlation from './components/Correlation/Correlation';

const App = () => {
  const [theme, setTheme] = useState<any>(null);
  const [state, dispatch] = useReducer(temperatureReducer, INITIAL_STATE);

  // populate temperature list after every one minutes
  const samplesize = 10;
  useEffect(() => {
    const interval = 60000;
    const isTrue =
      state.cpuTemperatureList.length < samplesize &&
      state.weatherTemperatureList.length < samplesize;
    const intervalVal = setInterval(() => {
      if (!isTrue) {
        return;
      }
      weatherDispatch(dispatch);
      cpuDispatch(dispatch);
    }, interval);
    isTrue ? intervalVal : null;
    return () => {
      clearInterval(intervalVal);
    };
  }, [state.cpuTemperatureList, state.weatherTemperatureList]);

  // navigate to display temperature data when sample data is collected
  const history = useHistory();
  useEffect(() => {
    if (
      samplesize === state.weatherTemperatureList.length &&
      samplesize === state.cpuTemperatureList.length
    ) {
      history.push('/display');
    } else {
      history.push('/');
    }
  }, [state.cpuTemperatureList, state.weatherTemperatureList, history]);

  // compose APP view
  return (
    <div
      className={`app w-100 ${!theme ? 'dark-theme' : 'light-theme'} relative`}
    >
      <div
        className="absolute right-2 top-2 w2 h2 br-100 pointer outline-0 ba flex items-center justify-center f4"
        onClick={() => setTheme(!theme)}
        onKeyPress={() => setTheme(!theme)}
        role="button"
        tabIndex={0}
      >
        <FontAwesomeIcon icon={theme ? faMoon : faSun} />
      </div>
      <Switch>
        <Route exact path="/">
          <Home data={state} size={samplesize} />
        </Route>
        <Route exact path="/display">
          <div className="flex flex-column justify-center w-100">
            <HeaderItem data={state} />
            <Chart stateData={state} />
            <Correlation data={state} />
          </div>
        </Route>
      </Switch>
      {console.log(state)}
    </div>
  );
};

export default App;
