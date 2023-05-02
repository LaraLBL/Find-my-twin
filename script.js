const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let timerStarted = false;
let cardOne, cardTwo;
let twinCardsFound = 0;
let timer = 0;
let timerId;
let numberOfMoves = 0;

cards.forEach(card => card.addEventListener('click', flipCard));

function shuffleCards() {
 cards.forEach(card => {
   const random = Math.floor(Math.random() * cards.length);
   card.style.order = random;
 });
};

function startTimer() {
 return setInterval(() => {
   timer++;
   const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
   const seconds = (timer % 60).toString().padStart(2, '0');
   document.getElementById('timer').textContent = `${minutes}:${seconds}`;
 }, 1000);
}

function flipCard() {
 if (lockBoard) return;
 if (this === cardOne) return;
 this.classList.add('flip');
 numberOfMoves++;
 document.getElementById('moves').textContent = numberOfMoves;
 if (!hasFlippedCard) {
   hasFlippedCard = true;
   cardOne = this;
   if (!timerStarted) {
     timerId = startTimer();
     timerStarted = true;
   }
   return;
 }
 cardTwo = this;
 checkForTwins();
}

function checkForTwins() {
 let areTwins = cardOne.id === cardTwo.id;
 if (areTwins) {
   twinCardsFound++;
   disableCards();
 } else {
   unflipCards();
 }
}

function disableCards() {
 cardOne.removeEventListener('click', flipCard);
 cardTwo.removeEventListener('click', flipCard);
 resetBoard();
 if (twinCardsFound === cards.length / 2) {
   clearInterval(timerId);
 }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
   cardOne.classList.remove('flip');
   cardTwo.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [cardOne, cardTwo] = [null, null];
}

function flipAllCards() {
 cards.forEach(card => {
   card.classList.add('flip');
 });
 setTimeout(() => {
   cards.forEach(card => {
     card.classList.remove('flip');
   });
   lockBoard = false;
 }, 2000);
}

shuffleCards();
flipAllCards();





