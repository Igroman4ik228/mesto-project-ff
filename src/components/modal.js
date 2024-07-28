// Функция открытия модального окна
function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

// Функция закрытия модального окна
function closeModal(modal) {
  document.removeEventListener('keydown', handlePressEscape);
  modal.classList.remove('popup_is-opened');
}

// Функция обработки нажатия клавиши Esc
function handlePressEscape(evt) {
  if (evt.key === 'Escape') {
    const openModal = document.querySelector('.popup_is-opened');
    closeModal(openModal);
  }
}

// Функция обработки клика на оверлей или кнопку закрытия
function handleOverlayOrCloseBtn(evt) {
  const modal = evt.currentTarget;
  const closeButton = modal.querySelector('.popup__close');
  if (evt.target === modal || evt.target === closeButton) {
    closeModal(modal);
  }
}

export { openModal, closeModal, handlePressEscape, handleOverlayOrCloseBtn }