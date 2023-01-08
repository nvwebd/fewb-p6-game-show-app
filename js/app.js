const getRandomPhraseAsArray = (inputPhrases) => {
  const randomPhrase = inputPhrases[Math.floor(Math.random() * inputPhrases.length)];
  return randomPhrase.split('');
}

const addPhraseToDisplay = (phraseChars) => {
  const phraseList = document.querySelector('#phrase ul');
  
  phraseChars.forEach(phraseChar => {
    phraseList.insertAdjacentHTML('beforeend', `<li class=${phraseChar !== ' ' ? 'letter' : null}>${phraseChar}</li>`)
  });
};

const checkLetter = (selectedLetter) => {
  const selectedLetterValue = selectedLetter.textContent;
  const letterElements = document.querySelectorAll(`.letter`);
  
  let foundLetter = null;
  
  letterElements.forEach(letterElement => {
    if (selectedLetterValue === letterElement.textContent) {
      letterElement.classList.add('show');
      foundLetter = letterElement;
    }
  });
  
  return foundLetter;
};

const checkWin = (showLetters, letters, misses, overlayContainer) => {
  if (misses >= 5) {
    overlayContainer.style.display = 'flex';
    overlayContainer.classList.add('lose');
  }
  
  if (showLetters !== 0 && letters !== 0) {
    if (showLetters === letters) {
      overlayContainer.style.display = 'flex';
      overlayContainer.classList.add('win');
    }
  }
}

const app = () => {
  let misses = 0;
  let letterFound;
  
  const overlayContainer = document.querySelector('#overlay');
  
  const qwerty = document.querySelector('#qwerty');
  const phrase = document.querySelector('#phrase');
  const tries = document.querySelectorAll('.tries');
  
  const startButton = document.querySelector('.btn__reset');
  const phrases = ['run into the ground', 'catch the sun', 'over and over', 'pack away', 'loud and clear'];
  
  const selectedPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(selectedPhrase);
  
  startButton.addEventListener('click', () => {
    overlayContainer.classList.remove('start');
    overlayContainer.style.display = 'none';
  });
  
  qwerty.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      event.target.classList.add('chosen');
      event.target.disabled = true;
      
      letterFound = checkLetter(event.target);
      
      if (!letterFound) {
        tries[misses].firstChild.src = 'images/lostHeart.png'
        misses++;
      }
  
      const showLetters = document.querySelectorAll('.show').length;
      const letters = document.querySelectorAll('.letters').length;
  
      console.log('showLetters: ', showLetters);
      console.log('letters: ', letters);
      
      checkWin(showLetters, letters, misses,  overlayContainer);
    }
  });
};

app();