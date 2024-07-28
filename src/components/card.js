// Темплейт(шаблон) карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(cardData, deleteCardFunc, likeCardFunc, showCardFunc) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener('click', showCardFunc);

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCardFunc(cardElement));

  const cardLike = cardElement.querySelector('.card__like-button');
  cardLike.addEventListener('click', likeCardFunc);

  return cardElement;
}

// Функция удаления карточки 
const deleteCard = (cardElement) => cardElement.remove();

// Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard }