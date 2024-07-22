// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData, deleteCardFunc) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCardFunc(cardElement))

  return cardElement; // Возврат готовой карточки
}

// Функция удаления карточки
const deleteCard = (cardElement) => cardElement.remove();

// Вывести карточки на страницу
initialCards.forEach((initialCard) => {
  const resultCard = createCard(initialCard, deleteCard)
  placesList.append(resultCard);
});