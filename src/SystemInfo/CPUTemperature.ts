/* eslint-disable import/prefer-default-export */
import * as si from 'systeminformation';

// get cpu temperature
export const getCPUTemperature = async () => {
  try {
    const data = await si.cpuTemperature();
    return data;
  } catch (error) {
    return error;
  }
};

// // eslint-disable-next-line import/prefer-default-export
// export const makeCPUTemperatureList = (
//   sampleSize: number,
//   interval: number
// ) => {
//   const temperatureList = [];
//   const temperatureValue = setInterval(() => {
//     getCPUTemperature();
//   }, interval);
//   temperatureList.push(temperatureValue);
//   if (temperatureList.length < sampleSize) {
//     makeCPUTemperatureList(sampleSize, interval);
//   }
//   return temperatureList;
// };

// create notification to tell user that complete reading has been taken
