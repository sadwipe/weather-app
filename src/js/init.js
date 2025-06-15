import loadCardContainer from './ui/loadCardContainer';
import updateCardInfo from './ui/updateCardInfo';
import displayErrorMessage from './ui/displayErrorMessage';
import { isCityInputEmpty, isSameCity } from './utils/validation';

function getDomElements() {
  return {
    button: document.querySelector('.search-button'),
    cityInput: document.getElementById('city-input'),
    cardContainer: document.querySelector('.card-container'),
    form: document.querySelector('.search-form'),
    currentCityTitle: document.querySelector('.card-title'),
  };
}

export default function init() {
  const { button, cityInput, cardContainer, form, currentCityTitle } =
    getDomElements();

  async function handleSearch(city) {
    try {
      await updateCardInfo(city);
      // Render the card container only if it is not visible.
      if (cardContainer.classList.contains('visible')) {
        return;
      }
      loadCardContainer();
    } catch (error) {
      displayErrorMessage("We could not find the city you're looking for.");
      console.error(error);
    }
  }

  function onSearch() {
    const city = cityInput.value.trim();
    if (isCityInputEmpty(city)) {
      displayErrorMessage('The length of the input cannot be 0.');
      return;
    }
    if (isSameCity(city, currentCityTitle.textContent)) {
      displayErrorMessage('You cannot search for the same city twice.');
      return;
    }
    handleSearch(city);
  }

  // Event listener for button
  button.addEventListener('click', () => {
    onSearch();
  });

  // Event listener for "Enter" key
  cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  });

  // Remove the error message after input
  cityInput.addEventListener('input', () => {
    const existingError = form.querySelector('.error');
    if (existingError && cityInput.value.trim()) {
      existingError.remove();
    }
  });
}
