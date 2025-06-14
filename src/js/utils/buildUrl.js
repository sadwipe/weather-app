export default function buildUrl(city) {
  const baseUrl =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  const encodedCity = encodeURIComponent(city.trim());
  const queryParams = new URLSearchParams({
    unitGroup: 'us',
    key: '8RFRBL4YYKZTRPRR6NA3TYATW',
    contentType: 'json',
  });
  return `${baseUrl}${encodedCity}?${queryParams.toString()}`;
}
