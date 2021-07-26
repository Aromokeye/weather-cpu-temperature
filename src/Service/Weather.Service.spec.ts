/* eslint-disable promise/always-return */
/* eslint-disable jest/no-conditional-expect */
import fetchMock from 'jest-fetch-mock';
import { getCurrentWeather } from './Weather.Service';

fetchMock.enableMocks();
// beforeEach(() => fetchMock.resetMocks());

describe('api test', () => {
  beforeEach(() => fetchMock.resetMocks());

  it('calls getCurrentWeather service', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: '256' }));
    // eslint-disable-next-line promise/always-return
    return getCurrentWeather('/weather').then((res) => {
      expect(res.data).toEqual('256');
    });
  });

  it('should fail', async () => {
    fetchMock.mockReject(() => Promise.reject(new Error('API is not working')));
    const temperature = await getCurrentWeather('/weather');
    expect(temperature).toEqual(new Error('API is not working'));
  });
});
