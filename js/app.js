const getRandomPhraseAsArray = (inputPhrases) => {
  const randomPhrase = inputPhrases[Math.floor(Math.random() * inputPhrases.length)];
  return randomPhrase.split('');
}

const addPhraseToDisplay = (phraseChars) => {
  const phraseList = document.querySelector('#phrase ul');
  phraseList.innerHTML = '';
  
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

const setUpRandomPhrase = (phrases) => {
  const selectedPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(selectedPhrase);
}

const app = () => {
  const phrases = ['run into the ground', 'catch the sun', 'over and over', 'pack away', 'loud and clear'];
  let misses = 0;
  let letterFound;
  
  const overlayContainer = document.querySelector('#overlay');
  const qwerty = document.querySelector('#qwerty');
  const phrase = document.querySelector('#phrase');
  const tries = document.querySelectorAll('.tries');
  
  const startButton = document.querySelector('.btn__reset');
  
  startButton.addEventListener('click', (event) => {
    qwerty.childNodes.forEach(keyrow => {
      keyrow.childNodes.forEach(charButton => {
        if (charButton.nodeType === 1) {
          charButton.classList.remove('chosen');
          charButton.removeAttribute('disabled');
        }
      });
    });
    
    setUpRandomPhrase(phrases);
    
    misses = 0;
  
    tries.forEach(scoreTry => {
      if (misses !== 0) {
        scoreTry.firstChild.src = 'images/liveHeart.png'
      }
    });
    
    event.target.textContent = 'Reset';
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
      
      checkWin(showLetters, letters, misses, overlayContainer);
    }
  });
};

app();