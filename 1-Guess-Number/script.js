'use strict';

let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const createSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};
let secretNumber = createSecretNumber();

const setHighscore = function (score, highscore) {
  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
};

const reset = function () {
  score = 20;
  setNumberText('?');
  setScore(score);
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  setBodyColor('#222');
  setNumberBoxWidth('15rem');
};

const setNumberText = function (text) {
  document.querySelector('.number').textContent = text;
};

const setNumberBoxWidth = function (width) {
  document.querySelector('.number').style.width = width;
};

const setScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const setBodyColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

const checkGame = function (guess) {
  if (!guess || guess > 20) {
    displayMessage('⛔ It is not valid number!');
  } else if (guess === secretNumber) {
    displayMessage('Correct Number!');
    setNumberText(secretNumber);
    setBodyColor('#60b347');
    setHighscore(score, highscore);
    setNumberBoxWidth('30rem');
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      setScore(score);
    } else {
      displayMessage('You lost the game!!!');
      setScore(0);
    }
  }
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  checkGame(guess);
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = createSecretNumber();
  reset();
});
