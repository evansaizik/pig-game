'use strict';
var scores, roundScore, activePlayer, currentScore, gamePlaying;

init();
var lastDice;

document.querySelector('.btn--roll').addEventListener('click', function() {
    
    if(gamePlaying) {
        //1. generate a random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        //2. display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = './dice-' + dice1 + '.png';
        document.getElementById('dice-1').src = './dice-' + dice2 + '.png';


        //3. update the round score if the rolled numner is not a 1

        /*if (dice === 6 && lastDice ===6) {
            scores[activePlayer] = 0;
            document.querySelector('#score--' + activePlayer).textContent = '0';
        }*/
        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        }else {
            //next player
            nextPlayer();
        }
        /*console.log(lastDice)
        lastDice = dice;
        console.log(lastDice)*/
    }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        // update UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;

        //undefined, 0, null or '' are coerced to false anything else is corced to true
        if(input) {
            var winningScore = input;
        }else{
            winningScore = 100;
        }

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!!!';
            document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        }else(
            //next player
            nextPlayer()
        )
        
    }
});

document.querySelector('.btn--new').addEventListener('click', init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.btn--roll').style.display = 'block';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
}


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';}

