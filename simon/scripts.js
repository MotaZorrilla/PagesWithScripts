let moves, totalMoves;
let sounds = {
   1: new Audio('sounds/s1.mp3'),
   2: new Audio('sounds/s2.mp3'),
   3: new Audio('sounds/s3.mp3'),
   4: new Audio('sounds/s4.mp3'),
   lose: new Audio('sounds/sadTrombone.mp3'),
   win: new Audio('sounds/win.mp3'),
};

function illuminate(cellPos, time) {
   setTimeout(() => {
      document.querySelector('.cell[pos="' + cellPos + '"]').classList.add('active');
      sounds[cellPos].play();
      setTimeout(() => {
         document.querySelector('.cell[pos="' + cellPos + '"]').classList.remove('active');
      }, 500);
   }, time);
}

function setMoves(current) {
   moves.push(Math.floor(Math.random() * 4) + 1);
   if (current < totalMoves) {
      setMoves(++current);
   }
}

function startGame() {
   moves = [];
   totalMoves = 1;
   document.querySelector('#moves').innerHTML = totalMoves;
   document.querySelector('#moves-counter').style.display = 'block';
   document.querySelector('#start').style.display = 'none';
   document.querySelector('#message').style.display = 'block';
   setTimeout(() => {
      sequence();
   }, 1000);
   cells.forEach(cell => {
      cell.addEventListener('click', cellClick);
   });
}

function sequence() {
   moves = [];
   setMoves(1);
   document.querySelector('#message').innerHTML = 'Simon says';

   for (let i = 0; i < moves.length; i++) {
      illuminate(moves[i], 800 * i);
   }

   setTimeout(() => {
      document.querySelector('#message').innerHTML = 'Replicate the sequence';
   }, 800 * moves.length);
}

function cellClick(e) {
   let cellPos = e.target.getAttribute('pos');
   sounds[cellPos].play();
   illuminate(cellPos, 0);

   if (moves && moves.length) {
      if (moves[0] == cellPos) {
         moves.shift();

         if (!moves.length) {
            totalMoves++;
            setTimeout(() => {
               sounds.win.play();
               document.querySelector('#moves').innerHTML = totalMoves;
               setTimeout(() => {
                  sequence();
               }, 2000);
            }, 1000);
         }
      }
      else {
         document.querySelector('#message').innerHTML = 'GAME OVER';
         setTimeout(() => {
            sounds.lose.play();
         }, 1000);
         setTimeout(() => {
            document.querySelector('#start').style.display = 'block';
            document.querySelector('#message').style.display = 'none';
            document.querySelector('#moves-counter').style.display = 'none';
         }, 3000);
      }
   }
}

document.querySelector('#start').addEventListener('click', startGame);
let cells = Array.from(document.getElementsByClassName('cell'));

