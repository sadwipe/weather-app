// Verify if the input is empty
export function isCityInputEmpty(city) {
  return !city.trim();
}

export function isSameCity(newCity, currentCity) {
  return newCity === currentCity;
}
