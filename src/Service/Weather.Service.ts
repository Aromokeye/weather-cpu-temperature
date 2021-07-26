/* eslint-disable no-console */
// call definition to make get request to open weather
// eslint-disable-next-line import/prefer-default-export
export const getCurrentWeather = async (endPoint: string) => {
  try {
    const response = await fetch(endPoint, {
      method: 'GET',
      headers: { Accept: '*/*' },
    });
    const body = await response.json();
    return body;
  } catch (error) {
    return error;
  }
};
