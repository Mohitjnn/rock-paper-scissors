
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}
updateElement();

/*this converting of the string type into object type, local storage is a memory place which helps by loading the previous information when the website is reloaded, local storage only string type items*/

/*getitem gets the value that ia stored in the local storage with referrence name 'score'. works like a keyword and definition or a pointer*/

/*if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
}*/
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
        playGame('paper');
    }
    else if (event.key === 's') {
        playGame('scissors');
    }
})

function playGame(playerMove) {
    let result = '';
    const computerMove = pickComputerMove();
    console.log(`${computerMove}`);
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose';
        }
        else if (computerMove === 'scissors') {
            result = 'Tie';
        }
        else if (computerMove === 'paper') {
            result = 'You win';
        }
    }
    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        }
        else if (computerMove === 'scissors') {
            result = 'You win';
        }
        else if (computerMove === 'paper') {
            result = 'You lose';
        }

    }

    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win';
        }
        else if (computerMove === 'scissors') {
            result = 'You lose';
        }
        else if (computerMove === 'paper') {
            result = 'Tie';
        }
    }

    if (result === 'Tie') {
        score.ties++;
    }
    else if (result === 'You win') {
        score.wins++;
    }
    else if (result === 'You lose') {
        score.losses++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    /*store item is used to store item in the string format inside the local storage*/
    updateElement();
    document.querySelector('.js-result').innerHTML = `${result}`;
    document.querySelector('.js-moves').innerHTML = ` you picked <img src="pictures/${playerMove}-emoji.png" alt="rock" class="move-icon">.computer picked <img src="pictures/${computerMove}-emoji.png" alt="rock" class="move-icon">  `;
}

function pickComputerMove() {
    let computerMove = '';
    let RandomNumber = Math.random();
    if (RandomNumber >= 0 && RandomNumber <= 1 / 3) {
        computerMove = 'rock';
    }
    else if (RandomNumber > 1 / 3 && RandomNumber <= 2 / 3) {
        computerMove = 'paper';
    }
    else if (RandomNumber > 2 / 3 && RandomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}
function updateElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties} `;
}
let isAutoPlaying = false;
let intervalId;
function autoplay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000)
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);//clears the time repeated acton that has been set by a call to th eset interval
        isAutoPlaying = false;
    }

}
document.querySelector('.js-option-rock').addEventListener('click', () => {
    playGame('rock');
});
document.querySelector('.js-option-paper').addEventListener('click', () => {
    playGame('paper');
});
document.querySelector('.js-option-scissor').addEventListener('click', () => {
    playGame('scissors');
});