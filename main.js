const charLengthValue = document.querySelector('.range-slider__value');
const slider = document.querySelector('#myRange');
const copyIcon = document.querySelector('.generated-password__copy-icon');
const generatedPasswordString = document.querySelector('.generated-password__string');
const genPassword = document.querySelector('.generated-password')

//slider value
slider.addEventListener('input', function () {
    charLengthValue.innerHTML = slider.value;
});

//copyValue
copyIcon.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  textarea.value = generatedPasswordString.textContent;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  copyIcon.insertAdjacentHTML('beforebegin', '<div class="alertText">copy</div>');

  setTimeout(() => {
        const alertText = genPassword.querySelector('.alertText');
        alertText.remove();
  }, 1000);

});



