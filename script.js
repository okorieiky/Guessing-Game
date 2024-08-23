let winScore = 0;
let lossScore = 0;
let totalGames = 0;
const maxGames = 5;
const winProbability = 0.7;  // Probability of user winning

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
});

document.getElementById('exit-button').addEventListener('click', () => {
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('goodbye-container').style.display = 'block';
});

document.getElementById('submit-guess').addEventListener('click', () => {
    if (totalGames >= maxGames) {
        alert("You have reached the maximum number of games. Please click 'Play Again' to restart.");
        return;
    }

    const userGuess = parseInt(document.getElementById('guess-input').value);
    const feedbackElement = document.getElementById('feedback');

    if (isNaN(userGuess) || userGuess < 0 || userGuess > 10) {
        feedbackElement.textContent = "Please enter a valid number between 0 and 10.";
        feedbackElement.className = 'feedback error';
        return;
    }

    const randomNumber = Math.floor(Math.random() * 11);
    const userWins = Math.random() < winProbability;

    if (userGuess === randomNumber || userWins) {
        winScore++;
        feedbackElement.textContent = `Congratulations! You guessed the correct number: ${randomNumber}`;
        feedbackElement.className = 'feedback success';
    } else {
        lossScore++;
        feedbackElement.textContent = `Sorry, you guessed wrong. The correct number was: ${randomNumber}`;
        feedbackElement.className = 'feedback error';
    }

    totalGames++;
    updateScores();
    
    if (totalGames < maxGames) {
        feedbackElement.textContent += ` You have ${maxGames - totalGames} games left.`;
    } else {
        document.getElementById('play-again').style.display = 'block';
    }
});

document.getElementById('play-again').addEventListener('click', () => {
    resetGame();
});

function updateScores() {
    document.getElementById('win-score').textContent = winScore;
    document.getElementById('loss-score').textContent = lossScore;
    document.getElementById('games-left').textContent = maxGames - totalGames;
}

function resetGame() {
    winScore = 0;
    lossScore = 0;
    totalGames = 0;
    updateScores();
    document.getElementById('feedback').textContent = "";
    document.getElementById('guess-input').value = "";
    document.getElementById('play-again').style.display = 'none';
}
