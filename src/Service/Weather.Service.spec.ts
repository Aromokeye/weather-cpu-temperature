/* eslint-disable jest/no-conditional-expect */
import { getCurrentWeather } from './Weather.Service';

test('should return a promise', async () => {
  const improvisedFetch = (url: string) => {
    expect(url).toBeInstanceOf(String);
    return new Promise<Response>(() => {});
  };
  try {
    await getCurrentWeather(
      improvisedFetch,
      'api.openweathermap.org/data/2.5/weather?q=London&appid=123'
    );
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
    expect(error).toMatch('error');
  }
});
