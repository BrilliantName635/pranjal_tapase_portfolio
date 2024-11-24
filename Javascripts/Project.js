let currentIndex = 0;
const cardsContainer = document.querySelector('.card-container');
const totalCards = document.querySelectorAll('.card').length;
const cardsPerView = 3; // We want to show 3 cards at a time

// Function to hide all cards
function hideAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'none';  // Hide all cards
    });
}

// Function to show the next set of 3 cards
function showCards() {
    const cards = document.querySelectorAll('.card');
    // Show the next 3 cards based on currentIndex
    for (let i = currentIndex; i < currentIndex + cardsPerView; i++) {
        if (cards[i]) {
            cards[i].style.display = 'block';  // Show the current set of cards
        }
    }
}

// Function to move the cards
function moveCards(direction) {
    // Hide all cards first
    hideAllCards();

    if (direction === 'left') {
        // Move back 3 cards but not past the first set
        currentIndex = Math.max(currentIndex - cardsPerView, 0);
    } else if (direction === 'right') {
        // Move forward 3 cards but not past the last set
        currentIndex = Math.min(currentIndex + cardsPerView, totalCards - cardsPerView);
    }

    // Show the appropriate set of cards after changing the index
    showCards();
}

// Initialize by showing the first 3 cards
showCards();
