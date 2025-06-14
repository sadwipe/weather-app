import getCityData from '../api/apiUtils';

function getDomElements() {
  return {
    cardTitle: document.querySelector('.card-title'),
    temperature: document.querySelector('.temperature'),
    condition: document.querySelector('.condition'),
    humidity: document.querySelector('.humidity'),
    precipitation: document.querySelector('.precipitation'),
    windSpeed: document.querySelector('.wind-speed'),
  };
}

export default async function updateCardInfo(city) {
  const {
    cardTitle,
    temperature,
    condition,
    humidity,
    precipitation,
    windSpeed,
  } = getDomElements();

  const data = await getCityData(city);
  const weatherData = data.currentConditions;
  const fahrenheit = weatherData.temp;
  const celsius = ((fahrenheit - 32) / 1.8).toFixed(1);

  cardTitle.textContent = city;
  temperature.textContent = `${celsius}°C (${fahrenheit}°F)`;
  condition.textContent = weatherData.conditions;
  humidity.textContent = `Humidity: ${weatherData.humidity}%`;
  precipitation.textContent = `Chance of rain: ${weatherData.precipprob}%`;
  windSpeed.textContent = `Wind: ${weatherData.windspeed} km/h`;

  // Update the UI elements.
}
