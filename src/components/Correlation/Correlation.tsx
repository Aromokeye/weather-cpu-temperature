/* eslint-disable no-console */
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
  const [definition, setDefinition] = useState('');
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

  useEffect(() => {
    if (correlation) {
      const figure = correlation.correlationCoefficient.toFixed(1);
      if (figure >= 0 && figure <= 0.199) {
        setDefinition('Very Weak Relationship');
      } else if (figure >= 0.2 && figure <= 0.399) {
        setDefinition('Weak Relationship');
      } else if (figure >= 0.4 && figure <= 0.599) {
        setDefinition('Moderate Relationship');
      } else if (figure >= 0.6 && figure <= 0.799) {
        setDefinition('Strong Relationship');
      } else if (figure >= 0.8 && figure === 1.0) {
        setDefinition('Very Strong Relationship');
      } else if (figure <= -1) {
        setDefinition('Negative Relationship');
      }
    }
  }, [correlation]);

  return (
    <div className="ba bw0 shadow-1 br4 mh3 mv2 pa2 db flex flex-column justify-center items-center correlation">
      <h1 className="f-headline accent1">
        {correlation &&
          parseFloat(correlation.correlationCoefficient.toFixed(2))}
      </h1>
      <span className="f5 b">Correlation: {definition && definition}</span>
    </div>
  );
};

export default Correlation;
