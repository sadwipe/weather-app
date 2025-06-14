import buildUrl from '../utils/buildUrl';

export default async function getCityData(city) {
  const url = buildUrl(city);
  const jsonResponse = await fetch(url, {
    mode: 'cors',
  });
  const response = await jsonResponse.json();
  return response;
}
