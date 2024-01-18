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

export function grabCardValue({ cards }) {
    let totalValue = 0;
    let numberOfAces = 0;

    for (const card of cards) {
        if (cardValues[card.value]) {
            totalValue += cardValues[card.value];
        } else {
            numberOfAces++;
        }
    }

    for (let i = 0; i < numberOfAces; i++) {
        if (totalValue + 11 <= 21) {
            totalValue += 11;
        } else {
            totalValue += 1;
        }
    }

    return totalValue;
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

export const determineWinner = ({ playersValue, dealersValue, betAmount, setMoney, setBetAmount, setWinner }) => {
    if (playersValue > 21 || (dealersValue <= 21 && dealersValue > playersValue)) {
        setMoney(prevAmount => prevAmount - betAmount);
        setBetAmount(0);
        setWinner("DEALER Wins!");
    } else if (dealersValue > 21 || (playersValue <= 21 && playersValue > dealersValue)) {
        setMoney(prevAmount => prevAmount + betAmount);
        setBetAmount(0);
        setWinner("PLAYER Wins!");
    } else {
        setWinner("It's a Tie!");
    }
};