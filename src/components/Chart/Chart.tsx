/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import './Chart.global.css';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { ITempState } from '../../Store/Reducer';

interface Props {
  stateData: ITempState;
}

const Chart: React.FC<Props> = ({ stateData }) => {
  const [data, setData] = useState<any[]>();
  // prepare chart data from stateData
  useEffect(() => {
    const newArray: any[] = [];
    stateData.cpuTemperatureList.forEach((cpuData, index) => {
      stateData.weatherTemperatureList.forEach((weatherData) => {
        const dataObject = {
          index: index + 1,
          CPU: parseFloat(cpuData.main.toFixed(2)),
          Weather: parseFloat((weatherData.main.temp - 273.15).toFixed(2)),
        };
        newArray.push(dataObject);
      });
    });
    setData(newArray);
  }, [stateData.cpuTemperatureList, stateData.weatherTemperatureList]);

  return (
    <div className="chart ba bw0 shadow-1 br4 ma3 pa2 db">
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />

          <XAxis
            dataKey="index"
            type="number"
            label={{ value: 'Index', position: 'insideBottomRight', offset: 0 }}
          />
          <YAxis
            unit="C"
            type="number"
            label={{ value: 'Temperature', angle: -90, position: 'insideLeft' }}
          />
          <Scatter name="CPU" dataKey="CPU" fill="#7ebdc2" />
          <Scatter name="Weather" dataKey="Weather" fill="#bb4430" />
          <Line
            dataKey="CPU"
            stroke="#7ebdc2"
            dot={false}
            activeDot={false}
            legendType="none"
          />
          <Line
            dataKey="Weather"
            stroke="#bb4430"
            dot={false}
            activeDot={false}
            legendType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
      {console.log(data)}
    </div>
  );
};
export default Chart;
