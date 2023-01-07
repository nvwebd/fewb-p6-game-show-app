const getRandomPhraseAsArray = (inputPhrases) => {
  const randomPhrase = inputPhrases[Math.floor(Math.random() * inputPhrases.length)];
  return randomPhrase.split('');
}

const addPhraseToDisplay = (phraseChars) => {
  const phraseList = document.querySelector('#phrase ul');
  
  phraseChars.forEach(phraseChar => {
    phraseList.insertAdjacentHTML('beforeend', `<li class=${phraseChar !== ' ' ? 'letter' : null} />`)
  });
};

const checkLetter = (selectedLetter) => {
  const selectedLetterValue = selectedLetter.textContext;
  const letterElements = document.querySelectorAll(`.letter`);
  // store the seletedLetter somewhere
  
  console.log('letterElements: ', letterElements);
  
  letterElements.forEach(letterElement => {
    if (selectedLetterValue === letterElement.textContext) {
      return letterElement;
    } else {
      return null;
    }
  })
};

const app = () => {
  const qwerty = document.getElementById('qwerty');
  const phrase = document.getElementById('phrase');
  const startButton = document.querySelector('.start a');
  
  let missed = 0;
  const phrases = ['run into the ground', 'catch the sun', 'over and over', 'pack away', 'loud and clear'];
  
  const selectedPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(selectedPhrase);
  
  startButton.addEventListener('click', () => {
    const startOverlay = document.querySelector('#overlay');
    startOverlay.style.display = 'none';
  });
  
  qwerty.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      event.target.classList.add('chosen');
      event.target.disabled = true;
      checkLetter(event.target);
    }
  });
};

app();