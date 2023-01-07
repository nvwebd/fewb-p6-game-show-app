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

const app = () => {
  const qwerty = document.getElementById('qwerty');
  const phrase = document.getElementById('phrase');
  const startButton = document.querySelector('.start a');
  
  let missed = 0;
  const phrases = ['run into the ground', 'catch the sun', 'over and over', 'pack away', 'loud and clear'];
  
  const selectedPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(selectedPhrase);
  
  console.log('selectedPhrase: ', selectedPhrase)
  
  startButton.addEventListener('click', () => {
    const startOverlay = document.querySelector('#overlay');
    startOverlay.style.display = 'none';
  });
};

app();