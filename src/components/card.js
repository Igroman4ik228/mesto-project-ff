import { requestLikeCard, unlikeCard } from './api.js';

// Темплейт(шаблон) карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardInfo, cardActions) {
  const { cardData, isOwner, isLiked } = cardInfo;
  const { confirmDeleteCardFunc, likeCardFunc, showCardFunc } = cardActions;

  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image');
  const likeCount = cardElement.querySelector('.card__like-counter');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;

  cardImage.addEventListener('click', showCardFunc);

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  if (isOwner)
    cardDeleteButton.addEventListener('click', () => confirmDeleteCardFunc(cardElement, cardData._id));
  else
    cardDeleteButton.remove();

  const cardLike = cardElement.querySelector('.card__like-button');
  if (isLiked)
    cardLike.classList.add('card__like-button_is-active');
  cardLike.addEventListener('click', (evt) => likeCardFunc(evt, likeCount, cardData._id));

  return cardElement;
};

// Функция лайка карточки
export function likeCard(evt, likeCount, cardId) {
  const isLiked = evt.target.classList.contains('card__like-button_is-active');
  const res = isLiked ? unlikeCard(cardId) : requestLikeCard(cardId);
  res.then(res => {
    likeCount.textContent = res.likes.length;
    evt.target.classList.toggle('card__like-button_is-active');
  })
    .catch(err => console.error(err))
};
