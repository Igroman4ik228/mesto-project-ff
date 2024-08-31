// Функция открытия модального окна
export function openModal(modal) {
  document.addEventListener('keydown', handlePressEscape);
  modal.classList.add('popup_is-opened');
}

// Функция закрытия модального окна
export function closeModal(modal) {
  document.removeEventListener('keydown', handlePressEscape);
  modal.classList.remove('popup_is-opened');
}

// Функция обработки нажатия клавиши Esc
export function handlePressEscape(evt) {
  if (evt.key === 'Escape') {
    const openModal = document.querySelector('.popup_is-opened');
    closeModal(openModal);
  }
}

// Функция обработки клика на оверлей или кнопку закрытия
export function handleOverlayOrCloseBtn(evt) {
  const modal = evt.currentTarget;
  if (evt.target === modal || evt.target.classList.contains('popup__close')) {
    closeModal(modal);
  }
}