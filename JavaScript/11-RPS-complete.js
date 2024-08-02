

let computerMove, playerMove;
let resultString;

let tally = JSON.parse(localStorage.getItem('tally')) || {
    wins: 0,
    losses: 0,
    tie: 0
};

updateScoreElement();

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins:${tally.wins}  Losses:${tally.losses}  Ties:${tally.tie}`;
}

function updateMove() {

    document.querySelector('.js-move')
        .innerHTML = `You 
        <img src="/Images/${playerMove}-emoji.png" class="img-button">
        
        <img src="/Images/${computerMove}-emoji.png" class="img-button">
        Computer`;
    return;
}

function updateResult(res) {
    if (res === 'tie') {
        document.querySelector('.js-result')
            .innerHTML = 'Tie.';
    }
    else if (res === 'win') {
        document.querySelector('.js-result')
            .innerHTML = 'You Win.';
    }

    else if (res === 'losses') {
        document.querySelector('.js-result')
            .innerHTML = 'You Lose.';
    }
}



function Calc(result) {

    if (result === 'win') {
        tally.wins++;
        resultString = 'You Win';
        updateResult('win');
        updateMove();
    }

    else if (result === 'losses') {
        tally.losses++;
        resultString = 'You Lose';
        updateResult('losses');
        updateMove();

    }

    else if (result === 'tie') {
        tally.tie++;
        resultString = 'Game tied';
        updateResult('tie');
        updateMove();
    }

    localStorage.setItem('tally', JSON.stringify(tally));
    updateScoreElement();

}

function pickMove() {
    let RandomNum = Math.random();


    if (RandomNum >= 0 && RandomNum < 1 / 3)
        computerMove = 'rock';
    else if (RandomNum >= 0 && RandomNum < 2 / 3)
        computerMove = 'paper';
    else
        computerMove = 'scissor';

}

function play(playerMove) {
    if (playerMove === computerMove) {
        Calc('tie');


        return;
    }
    if (playerMove === 'rock') {
        if (computerMove === 'paper') {
            Calc('losses');

        }
        else if (computerMove === 'scissor') {
            Calc('win');

        }

    }
    if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            Calc('win');

        }
        else if (computerMove === 'scissor') {
            Calc('losses');

        }

    }
    if (playerMove === 'scissor') {
        if (computerMove === 'rock') {
            Calc('losses');

        }
        else if (computerMove === 'paper') {
            Calc('win');

        }

    }



}

