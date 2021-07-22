// interface for http call function; axios, fetch or any other
export interface IFetch {
  (input: string): Promise<Response>;
}

// call definition to make get request to open weather
export const getCurrentWeather = async (fetch: IFetch, endPoint: string) => {
  try {
    const response = await fetch(`${endPoint}`);
    const body = await response.json();
    return body;
  } catch (error) {
    return error;
  }
};
