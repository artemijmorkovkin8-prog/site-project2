document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const successMessage = document.getElementById('success-message');

  // Восстановление черновика
  const draft = JSON.parse(localStorage.getItem('contactDraft') || '{}');
  if (draft.name) nameInput.value = draft.name;
  if (draft.email) emailInput.value = draft.email;
  if (draft.message) messageInput.value = draft.message;

  // Сохранение черновика при вводе
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', saveDraft);
  });

  function saveDraft() {
    const draft = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };
    localStorage.setItem('contactDraft', JSON.stringify(draft));
  }

  // Функции валидации
  function validateName(value) {
    return value.trim() !== '';
  }
  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  function validateMessage(value) {
    return value.trim().length >= 10;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Очистка ошибок
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    successMessage.classList.add('hidden');

    let isValid = true;

    if (!validateName(nameInput.value)) {
      nameError.textContent = 'Имя не должно быть пустым';
      isValid = false;
    }
    if (!validateEmail(emailInput.value)) {
      emailError.textContent = 'Введите корректный e-mail (например, name@domain.com)';
      isValid = false;
    }
    if (!validateMessage(messageInput.value)) {
      messageError.textContent = 'Сообщение должно содержать не менее 10 символов';
      isValid = false;
    }

    if (isValid) {
      const data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
      };
      console.log('Отправленные данные:', data);
      localStorage.removeItem('contactDraft');
      successMessage.classList.remove('hidden');
      form.reset();
      localStorage.removeItem('contactDraft'); // на случай автосохранения после reset
    }
  });
});
