/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { ITempState } from '../../Store/Reducer';
import './Home.global.css';

interface Props {
  data: ITempState;
  size: number;
}
const Home: React.FC<Props> = ({ data, size }) => {
  const [secondText, showSeconText] = useState(false);
  const [progressText, showProgressText] = useState(false);
  const [cpuProgress, setCpuProgress] = useState(0);
  const [weatherProgress, setWeatherProgress] = useState(0);

  // create progress bar during data collection
  useEffect(() => {
    setCpuProgress((data.cpuTemperatureList.length / size) * 100);
    setWeatherProgress((data.weatherTemperatureList.length / size) * 100);
  }, [data.cpuTemperatureList, data.weatherTemperatureList, size]);

  // animate incoming texts
  useEffect(() => {
    const interval = setTimeout(() => {
      showSeconText(true);
    }, 1000);
    const interval2 = setTimeout(() => {
      showProgressText(true);
    }, 4000);
    return () => {
      clearTimeout(interval);
      clearTimeout(interval2);
    };
  });

  return (
    <div className="w-100 h-100 pb4 flex flex-column justify-center items-center">
      <div className="flex flex-column">
        <h1 className="f-1 measure-narrow lh-title">
          Does the weather influence my computer’s core temperature?
        </h1>
        <h2
          className={`${
            secondText ? 'f-3 measure-narrow lh-title mt2 fade-in-text' : 'dn'
          }`}
        >
          Let us collect 10 temperature samples of both the weather and CPU at
          an interval of 1 minute
        </h2>
        <div
          className={`${
            progressText
              ? 'f-3 measure-narrow lh-title mt2 fade-in-text pt2 flex flex-column w-100'
              : 'dn'
          }`}
        >
          <div className="mb2">
            <div className="mb1">
              CPU Data Collection Progress: {cpuProgress}%
            </div>
            <div style={{ width: `${cpuProgress}%` }} className="cpuProgress" />
          </div>
          <div className="mb2">
            <div className="mb1">
              Weather Data Collection Progress: {weatherProgress}%
            </div>
            <div
              style={{ width: `${weatherProgress}%` }}
              className="weatherProgress"
            />
          </div>
          <div className="mt3 accent1">
            Headsup: The number of samples you collect and their interval might
            just be impactful
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
