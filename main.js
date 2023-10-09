const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-_+=[]{}|\\;:<>?,./';

const button = document.querySelector('.generate-button');
const charLengthValue = document.querySelector(".range-slider__value");
const slider = document.querySelector("#myRange");
const copyIcon = document.querySelector(".generated-password__copy-icon");
const generatedPasswordString = document.querySelector(
  ".generated-password__string"
);
const genPassword = document.querySelector(".generated-password");
const secureLevelColumns = document.querySelectorAll(
  ".secure-level__filledCount__columns__ul__li"
);
const secureLevelColumnsFilled = document.querySelectorAll(
  ".secure-level__filledCount__columns__ul__li--filled"
);
const securityLevelString = document.querySelector(
  ".secure-level__filledCount__string"
);

/* Checkboxen */
const checkboxUppercase = document.querySelector("#checkboxUppercase");
const checkboxLowercase = document.querySelector("#checkboxLowercase");
const checkboxNumbers = document.querySelector("#checkboxNumbers");
const checkboxSymbols = document.querySelector("#checkboxSymbols");
const checkboxes = document.querySelectorAll(
  '.security-settings__li input[type="checkbox"]'
);


function updateFilledColumns() {
  const filledCount = [...checkboxes].filter(checkbox => checkbox.checked).length;

  secureLevelColumns.forEach(function (column, index) {
    if (index < filledCount) {
      switch (true) {
        case filledCount === 1:
          column.style.backgroundColor = "red";
          securityLevelString.textContent = "Weak";
          break;
        case filledCount < 4:
          securityLevelString.textContent = "Medium";
          column.style.backgroundColor = "yellow";
          break;
        case filledCount === 4:
          securityLevelString.textContent = "Strong";
          column.style.backgroundColor = "green";
          break;
        default:
      }

      column.classList.add(
        "secure-level__filledCount__columns__ul__li--filled"
      );
    } else {
      column.style.backgroundColor = "";
      column.classList.remove(
        "secure-level__filledCount__columns__ul__li--filled"
      );
    }
  });
}

// Eventlistener für Checkboxen
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", updateFilledColumns);
});

//sliderWert
slider.addEventListener("input", () => {
  charLengthValue.innerHTML = slider.value;
});

//copyWert
copyIcon.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  textarea.value = generatedPasswordString.textContent;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const alertText = copyIcon.querySelector('.alertText');

  if (!alertText) {
    copyIcon.insertAdjacentHTML(
      "afterbegin",
      '<div class="alertText">copied</div>'
    );
  }
  


  setTimeout(() => {
    const alertText = genPassword.querySelector(".alertText");
    alertText.remove();
  }, 1000);
});

function getRandomElementFromString(string) {
  const randomIndex = Math.floor(Math.random() * string.length);
  return string[randomIndex];
}


function concatPwElements() {
  let pwArr = '';

  if (checkboxUppercase.checked) {
    pwArr += uppercaseLetters;
  }
  if (checkboxLowercase.checked) {
    pwArr += lowercaseLetters;
  }
  if (checkboxNumbers.checked) {
    pwArr += numbers;
  }
  if (checkboxSymbols.checked) {
    pwArr += symbols;
  }

  return pwArr;
}


button.addEventListener('click', function() {

  const sliderValue = Number(slider.value);
  const pwString = concatPwElements();
  let pwBuilder = '';

    // Check if no character types are selected
    if (pwString.length === 0) {
      generatedPasswordString.textContent = "Please select at least one character type.";
      return; // Exit the function early
    }

  for (let i = 1; i <= sliderValue; i++) {
    randomPwElement = getRandomElementFromString(pwString);
    pwBuilder = pwBuilder.concat(randomPwElement);
  }

  generatedPasswordString.textContent = pwBuilder;

});