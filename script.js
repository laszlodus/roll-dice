'use strict';

const btnRoll = document.querySelector('.btn-roll');
const btnNew = document.querySelector('.btn-new');
const btnHold = document.querySelector('.btn-hold');
const player0 = document.querySelector('.player0');
const player1 = document.querySelector('.player1');

const active0 = document.querySelector('.current0');
const active1 = document.querySelector('.current1');
const score0 = document.querySelector('.score0');
const score1 = document.querySelector('.score1');
const picture = document.querySelector('.dice');

let score, current, activePlayer, playing;

const startGame = function() {
    score = [0, 0];
    current = 0;
    activePlayer = 0;
    playing = true;

    picture.classList.add('hidden');
    player0.classList.remove('current-winner');
    player1.classList.remove('current-winner');
    player0.classList.add('player-active');
    player1.classList.remove('player-active');
    active0.textContent = 0;
    active1.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;
}
startGame();

const switchPlayer = function() {
   current = 0;
    document.querySelector(`.current${activePlayer}`).textContent = 0;
    activePlayer = activePlayer !== 0 ? 0 : 1; 
    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
}

/*start game*/
btnRoll.addEventListener('click', function() {
   if(playing) {
         let dice = Math.trunc(Math.random() * 6) + 1;
         
         picture.classList.remove('hidden');
         picture.src = `./side_${dice}.png`;
         current += dice;
         document.querySelector(`.current${activePlayer}`).textContent = current;
   if(dice === 1) {
   switchPlayer();
   }
   }
})

btnHold.addEventListener('click', function() {
   if(playing) {
      score[activePlayer] += current;
      current = 0;
      document.querySelector(`.score${activePlayer}`).textContent = score[activePlayer];
      document.querySelector(`.current${activePlayer}`).textContent = 0;
      if(score[activePlayer] >= 20) {
         document.querySelector(`.player${activePlayer}`).classList.remove('player-active');
         document.querySelector(`.player${activePlayer}`).classList.add('current-winner');
         document.querySelector(`.score${activePlayer}`).textContent = `🎉 ${score[activePlayer]}`;
         playing = false;
         picture.classList.add('hidden');
      }else {
         switchPlayer();
      }
   }
})

btnNew.addEventListener('click', startGame);