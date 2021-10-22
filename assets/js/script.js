/**
 * Creates and controls data for the game 
 */
class MemoryGame {

    /**
     * Sets the template for the game
     * @param {number} totalTime - Total time to play
     * @param {object} cards - Cards in the deck
     */
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time');
        this.ticker = document.getElementById('flips');
    }

    /**
     * Starts the game
     */
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        //Delays the start of the game after click for smoother experience
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);

        //Resets the timer and flip count
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    /**
     * Loops through the cards array and flips the cards back
     */
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
        });
    }

    /**
     * Flips the clicked card and updates the flip count
     * @param {object} card - The clicked card
     */
    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if (this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
        }
    }

    /**
     * Checks if the clicked pair of cards are the same
     * @param {object} card - The clicked card
     */
    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }

    /**
     * Displays flipped pair if they match and a victory message if all cards have been matched
     * @param {object} card1 - The first clicked card
     * @param {object} card2 - The second clicked card
     */
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        if (this.matchedCards.length === this.cardsArray.length)
            this.endGame('victory');
    }

    /**
     * Flips the pair of mismatched cards back over after a small delay
     * @param {object} card1 - The first clicked card
     * @param {object} card2 - The second clicked card
     */
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 650);
    }

    /**
     * Gets a value to identify the clicked card
     * @param {object} card - The card clicked
     * @returns {string} - the value of a class
     */
    getCardType(card) {
        return card.getElementsByClassName('fas')[1].classList[1];
    }

    /**
     * Counts the time down one second at a time, ends the game if time runs out
     */
    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0)
                this.endGame('game-over');
        }, 1000);
    }

    /**
     * Stops the countdown and displays win/lose message
     * @param {string} outcome - Id's the overlay to become visible
     */
    endGame(outcome) {
        clearInterval(this.countDown);
        document.getElementById(outcome).classList.add('visible');
    }

    /**
     * Fisher-Yates shuffle algorithm, shuffles the cards 
     */
    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    /**
     * Determines if the card can be flipped
     * @param {object} card - The card being clicked
     * @returns {boolean} - If true the card can be flipped
     */
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

}

/**
 * Creates arrays out of HTML collections and loops through them and initiates the game
 */
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MemoryGame(45, cards);

    //Loops and adds click events to the overlay messages
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    //Loops and adds click events to the cards
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });

}

/**
 * Makes sure the DOM has been loaded before starting the game
 */
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}