/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ITempState } from '../../Store/Reducer';
import './Correlation.global.css';

const Statistics = require('statistics.js');

interface Props {
  data: ITempState;
}

const Correlation: React.FC<Props> = ({ data }) => {
  const [newData, setData] = useState<any[]>([]);
  const [correlation, setCorrelation] = useState<any>(null);
  // prepare correlation array data from data props

  useEffect(() => {
    const newArray: any[] = [];
    data.cpuTemperatureList.forEach((cpuData) => {
      data.weatherTemperatureList.forEach((weatherData) => {
        const dataObject = {
          CPU: parseFloat(cpuData.main.toFixed(2)),
          Weather: parseFloat((weatherData.main.temp - 273.15).toFixed(2)),
        };
        newArray.push(dataObject);
      });
    });
    setData(newArray);
  }, [data.cpuTemperatureList, data.weatherTemperatureList]);

  useEffect(() => {
    const dataVars = {
      CPU: 'metric',
      Weather: 'metric',
    };
    if (newData?.length > 0) {
      const stats = new Statistics(newData, dataVars);
      const r = stats.correlationCoefficient('CPU', 'Weather');
      setCorrelation(r);
    }
  }, [data, newData]);

  return (
    <div className="ba bw0 shadow-1 br4 mh3 mv2 pa2 db flex justify-center itemscenter correlation">
      <span className="self-end pb3">Correlation</span>
      <h1 className="f-headline accent1">
        {correlation && correlation.correlationCoefficient.toFixed(1)}
      </h1>
    </div>
  );
};

export default Correlation;
