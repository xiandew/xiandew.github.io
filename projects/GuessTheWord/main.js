let gameState = {
    yourCurrentScore: 0,
    incorrectGuesses: 0,
    remainingGuesses: 10
};
let word;
let answer;

function setWord() {
    //set word to be guessed
    word = words[Math.floor(Math.random() * words.length)].toLowerCase();
    answer = [];

    let wordTiles = document.getElementById("wordTiles");
    wordTiles.innerHTML = "";
    for (let i in word) {
        wordTiles.innerHTML += `<input class="char" value=${word[i]} id=${i} maxlength="1" disabled>`;
    }

    let unordered = {};
    for (let i = 0, numGuesses = Math.ceil(word.length / 2); i < numGuesses; i++) {
        let letters =
            Array.from(wordTiles.getElementsByClassName("char"))
                .filter(letter => letter.disabled == true);
        let guess = letters[Math.floor(Math.random() * letters.length)];
        guess.disabled = false;
        guess.className = "guess";
        unordered[guess.id] = guess.value;
        guess.removeAttribute("value");
    }
    Object.keys(unordered).sort().forEach(key => {
        answer.push(unordered[key]);
    });

    let submitBtn = document.getElementById("submit");
    submitBtn.parentNode.insertBefore(wordTiles, submitBtn);
}

function validateGuesses () {
    //validate the input from the form (letter)
    let guesses = [];
    Array.from(document.getElementsByClassName("guess")).forEach(dom => {
        guesses.push(dom.value.toLowerCase());
    });
    return guesses;
}

function check () {
    let guesses = validateGuesses();

    //check if the guess is correct
    if (guesses.toString() == answer.toString()) {
        alert("You get it right!");
        setWord();
        updateGameState({
            "yourCurrentScore": gameState.yourCurrentScore + 1
        });
    } else {
        alert("Wrong! Try again");
        updateWordTiles();
        updateGameState({
            "incorrectGuesses": gameState.incorrectGuesses + 1,
            "remainingGuesses": gameState.remainingGuesses - 1
        });
        checkEndOfGame();
    }
}

function updateWordTiles() {
    //update the tiles on the HTML
    Array.from(document.getElementsByClassName("guess")).forEach(d => {
        d.value = "";
        d.removeAttribute("value");
    });
}

function checkEndOfGame(){
    // check if the player has guessed the secret word or if the game is over (no more
    // remaining guesses)
    if (gameState.remainingGuesses == 0) {
        alert(`You lose it! The answer is ${word}`);
        reset();
    }
}

function updateGameState(data) {
    for (let attr in data) {
        gameState[attr] = data[attr];
        document.getElementById(attr).innerText = padding(data[attr], 3);
    }
}

function padding(num, length) {
    return (Array(length).join("0") + num).slice(-length);
}

function reset () {
    // reset the game (set new word to be guessed, clean word tiles, incorrect
    // guesses and remaining guesses)
    setWord();
    updateGameState({
        "yourCurrentScore": 0,
        "incorrectGuesses": 0,
        "remainingGuesses": 10
    });
}
