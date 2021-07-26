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
      if (figure === 0 && figure <= 0.199) {
        setDefinition('Very Weak');
      } else if (figure >= 0.2 && figure <= 0.399) {
        setDefinition('Weak');
      } else if (figure >= 0.4 && figure <= 0.599) {
        setDefinition('Medium');
      } else if (figure >= 0.6 && figure <= 0.799) {
        setDefinition('Strong');
      } else if (figure >= 0.8 && figure === 1.0) {
        setDefinition('Very Strong');
      } else if (figure === -1) {
        setDefinition('Inverse');
      }
    }
  }, [correlation]);

  return (
    <div className="ba bw0 shadow-1 br4 mh3 mv2 pa2 db flex justify-center itemscenter correlation">
      <span className="self-end pb3 mr2">
        Correlation: {definition && definition}
      </span>
      <h1 className="f-headline accent1">
        {correlation && correlation.correlationCoefficient.toFixed(1)}
      </h1>
    </div>
  );
};

export default Correlation;
