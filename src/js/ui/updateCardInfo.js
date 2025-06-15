import getCityData from '../api/apiUtils';
import createColorObject from '../utils/createColor';

function getDomElements() {
  return {
    cardTitle: document.querySelector('.card-title'),
    temperature: document.querySelector('.temperature'),
    condition: document.querySelector('.condition'),
    humidity: document.querySelector('.humidity'),
    precipitation: document.querySelector('.precipitation'),
    windSpeed: document.querySelector('.wind-speed'),
    body: document.querySelector('body'),
    title: document.querySelector('.title')
  };
}

function getWeatherColor(condition) {
  const lc = condition.toLowerCase();
  console.log(condition)

  if (lc.includes('clear') || lc.includes('sunny')) {
    return createColorObject('linear-gradient(to top, #fceabb, #f8b500)', '#f8b500');
  } else if (lc.includes('partly') || lc.includes('mostly sunny') || lc.includes('scattered')) {
    return createColorObject('linear-gradient(to top, #a1c4fd, #c2e9fb)', '#76b2fe');
  } else if (lc.includes('mostly cloudy')) {
    return createColorObject('linear-gradient(to top, #b6bac3, #828c9c)', '#9ba2b1');
  } else if (lc.includes('cloudy')) {
    return createColorObject('linear-gradient(to top, #757f9a, #d7dde8)', '#8d97a8');
  } else if (lc.includes('overcast')) {
    return createColorObject('linear-gradient(to top, #999, #666)', '#777777');
  } else {
    return createColorObject('linear-gradient(to top, #cccccc, #666666)', '#888888');
  }
}

export default async function updateCardInfo(city) {
  const {
    cardTitle,
    temperature,
    condition,
    humidity,
    precipitation,
    windSpeed,
    body,
    title
  } = getDomElements();

  const data = await getCityData(city);
  const weatherData = data.currentConditions;
  const colorPalette = getWeatherColor(weatherData.conditions);
  const fahrenheit = weatherData.temp;
  const celsius = ((fahrenheit - 32) / 1.8).toFixed(1);
  
  body.style.cssText = `background: ${colorPalette.background}`;
  title.style.cssText = `color: ${colorPalette.color}`;

  cardTitle.textContent = city;
  temperature.textContent = `${celsius}°C (${fahrenheit}°F)`;
  condition.textContent = weatherData.conditions;
  humidity.textContent = `Humidity: ${weatherData.humidity}%`;
  precipitation.textContent = `Chance of rain: ${weatherData.precipprob}%`;
  windSpeed.textContent = `Wind: ${weatherData.windspeed} km/h`;

}
 