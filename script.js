"use strict";

// Selecting all our project elements so we can manipulate the DOM and change the UI.
const messageEl = document.querySelector(".message");
const guessEl = document.querySelector(".guess");
const scoreEl = document.querySelector(".score");
const numberEl = document.querySelector(".number");
const resultEl = document.querySelector(".result");
const highscoreEl = document.querySelector(".highscore");
const clickButton = document.querySelector(".click-me");
const againButton = document.querySelector(".again");

// Setting our secret number between 1-20, our main score that we start with and also the high score that will be increased later.
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// Very simple function to display a message in the game when the player dose something.
const displayMessage = function (message) {
  messageEl.textContent = message;
};

// Our main function call when the player enters a number and starts guessing.
clickButton.addEventListener("submit", function (e) {
  e.preventDefault();

  // Getting the entered value by the player.
  const guess = Number(guessEl.value);

  // When the player does not enter anything and clicks on the button, we do some DOM changes and show a new message.
  if (!guess) {
    messageEl.style.borderRadius = "6px";
    messageEl.style.backgroundColor = "#13121185";
    messageEl.style.color = "#f5f5f4";
    displayMessage("No Number!!");

    // When the player wins and guesses the secret number.
  } else if (guess === secretNumber) {
    // Some DOM changes.
    messageEl.style.removeProperty("color");
    messageEl.style.backgroundColor = "#3efd0467";
    messageEl.style.borderRadius = "5px";
    // We set the score and guess value to zero.
    scoreEl.innerHTML = 0;
    guessEl.value = "";
    guessEl.blur();
    // Display a new message.
    displayMessage("You won!");
    // Reveal the secret number.
    numberEl.classList.add("hidden");
    resultEl.innerHTML = secretNumber;

    // The game will restart again after 5 seconds.
    setTimeout(() => {
      init();
    }, 5000);

    // When the score that the player ended up with after he won the game is bigger than the high score.
    if (score > highscore) {
      // The high score will be that score that we ended up with.
      highscore = score;
      // We update the UI with the new score value.
      highscoreEl.textContent = highscore;
      // Reset the score to zero so that we can play again.
      score = 0;
    }

    // When the player guesses wrong.
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // When the guess number is bigger than the secret number.
      if (guess > secretNumber) {
        // Some crazy DOM manipulation!
        messageEl.style.removeProperty("color");
        messageEl.style.backgroundColor = "#5f583140";
        messageEl.style.borderRadius = "100px";
        messageEl.style.borderTopRightRadius = "0";
        messageEl.style.borderBottomLeftRadius = "0";
        // Update the message.
        displayMessage("Too high!");
        // When the guess number is smaller than the secret number.
      } else {
        // Also crazy DOM manipulation!
        messageEl.style.removeProperty("color");
        messageEl.style.backgroundColor = "#5f583140";
        messageEl.style.borderRadius = "100px";
        messageEl.style.borderTopLeftRadius = "0";
        messageEl.style.borderBottomRightRadius = "0";
        // Update the message.
        displayMessage("Too low!");
      }
      // Either way, if bigger or smaller we decrease the score by one.
      score--;
      // Update the score on the UI.
      scoreEl.textContent = score;
    } else {
      // When the player loses the game.
      messageEl.style.removeProperty("color");
      messageEl.style.backgroundColor = "#fd0404b7";
      messageEl.style.borderRadius = "6px";
      // Update the message.
      displayMessage("You Lost...");
      // Reset the score and guess value to zero.
      scoreEl.textContent = 0;
      guessEl.value = "";
      guessEl.blur();

      // The game will restart again after 5 seconds.
      setTimeout(() => {
        init();
      }, 5000);
    }
  }
});

// The initial function that we call when the player win, lose or restart the game.
function init() {
  // Generate the score and secret number.
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // Set the message.
  displayMessage("Your Guess...");
  // UI changes.
  resultEl.innerHTML = "";
  numberEl.classList.remove("hidden");
  messageEl.style.removeProperty("color");
  messageEl.style.borderRadius = "100px";
  messageEl.style.borderTopRightRadius = "4rem";
  messageEl.style.borderBottomLeftRadius = "4rem";
  messageEl.style.backgroundColor = "#5f583131";
  scoreEl.textContent = score;
  guessEl.value = "";
}

// Calling that initial function when the player clicks on the button again.
againButton.addEventListener("click", function () {
  init();
});
