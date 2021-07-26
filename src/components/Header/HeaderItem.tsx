/* eslint-disable no-console */
import React from 'react';
import { ITempState } from '../../Store/Reducer';
import './HeaderItem.global.css';

interface Props {
  data: ITempState;
}

const HeaderItem: React.FC<Props> = ({ data }) => {
  const cpu = data.cpuTemperatureList;
  const weather = data.weatherTemperatureList;
  return (
    <div className="flex">
      <div className="ba br4 bw0 shadow-1 w-50 pv2 ph4 mt3 mh3 headerItem">
        <div className="flex items-center">
          <h1 className="f-headline accent1">
            {cpu[cpu.length - 1].main.toFixed(2)}
          </h1>
          <div className="flex self-end mb2">Celcius</div>
        </div>
        <h3 className="f5 b">Most Recent CPU Temperature</h3>
      </div>
      <div className="ba br4 bw0 shadow-1 w-50 pv2 ph4 mt3 mr3 headerItem">
        <div className="flex items-center">
          <h1 className="f-headline accent2">
            {(weather[weather.length - 1].main.temp - 273.15).toFixed(2)}
          </h1>
          <div className="flex self-end mb2">Celcius</div>
        </div>
        <h3 className="f5 b">Most Recent Weather Temperature</h3>
      </div>
    </div>
  );
};

export default HeaderItem;
