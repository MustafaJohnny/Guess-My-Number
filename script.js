'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.click-me').addEventListener('submit', function (e) {
  e.preventDefault();
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').style.borderRadius = '6px';
    document.querySelector('.message').style.backgroundColor = '#13121185';
    document.querySelector('.message').style.color = '#f5f5f4';
    displayMessage('No Number!!');

    // When player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').style.removeProperty('color');
    document.querySelector('.message').style.backgroundColor = '#3efd0467';
    document.querySelector('.message').style.borderRadius = '5px';
    document.querySelector('.score').innerHTML = 0;
    document.querySelector('.guess').value = '';
    document.querySelector('.guess').blur();
    displayMessage('You won!');
    document.querySelector('.number').classList.add('hidden');
    document.querySelector('.result').innerHTML = secretNumber;

    setTimeout(() => {
      init();
    }, 5000);

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
      score = 0;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      if (guess > secretNumber) {
        document.querySelector('.message').style.removeProperty('color');
        document.querySelector('.message').style.backgroundColor = '#5f583140';
        document.querySelector('.message').style.borderRadius = '100px';
        document.querySelector('.message').style.borderTopRightRadius = '0';
        document.querySelector('.message').style.borderBottomLeftRadius = '0';
        displayMessage('Too high!');
      } else {
        document.querySelector('.message').style.removeProperty('color');
        document.querySelector('.message').style.backgroundColor = '#5f583140';
        document.querySelector('.message').style.borderRadius = '100px';
        document.querySelector('.message').style.borderTopLeftRadius = '0';
        document.querySelector('.message').style.borderBottomRightRadius = '0';
        displayMessage('Too low!');
      }
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').style.removeProperty('color');
      document.querySelector('.message').style.backgroundColor = '#fd0404b7';
      document.querySelector('.message').style.borderRadius = '6px';
      displayMessage('You Lost...');
      document.querySelector('.score').textContent = 0;
      document.querySelector('.guess').value = '';
      document.querySelector('.guess').blur();

      setTimeout(() => {
        init();
      }, 5000);
    }
  }
});

function init() {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Guess Now...');
  document.querySelector('.result').innerHTML = '';
  document.querySelector('.number').classList.remove('hidden');
  document.querySelector('.message').style.removeProperty('color');
  document.querySelector('.message').style.borderRadius = '100px';
  document.querySelector('.message').style.borderTopRightRadius = '4rem';
  document.querySelector('.message').style.borderBottomLeftRadius = '4rem';
  document.querySelector('.message').style.backgroundColor = '#5f583131';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
}

document.querySelector('.again').addEventListener('click', function () {
  init();
});
