const cardValues = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'JACK': 10,
    'QUEEN': 10,
    'KING': 10,
}

export function grabCardValue(card, playerValue, dealerValue) {
    if (!cardValues[card]) {
        if (playerValue + 11 <= 21) {
            return 11;
        } else {
            return 1;
        }
    }
    return cardValues[card];
}

export async function getOneCardFromDeck({ deckId, getOneCards, setUserCards }) {
    try {
        const userInitialCards = await getOneCards(deckId);
        setUserCards(prevCards => [...prevCards, ...userInitialCards])
    } catch (error) {
        console.error('Error fetching initial cards:', error);
    }
}

export async function getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards }) {
    try {
        const userInitialCards = await getTwoCards(deckId);
        const dealerInitialCards = await getTwoCards(deckId);

        setUserCards(userInitialCards);
        setDealersCards(dealerInitialCards);
    } catch (error) {
        console.error('Error fetching initial cards:', error);
    }
};