
export async function getNewDeck() {
    const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=8');
    if (!response.ok) {
        throw new Error(`Error: ${response}`)
    }
    const result = await response.json();
    return result.deck_id
}

export async function getTwoCards(deck_id) {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`);
    if (!response.ok) {
        throw new Error(`Error: ${response}`)
    }
    const result = await response.json();
    return result.cards
}

export async function getOneCards(deck_id) {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    if (!response.ok) {
        throw new Error(`Error: ${response}`)
    }
    const result = await response.json();
    return result.cards
}

export const backOfCardUrl = 'https://www.deckofcardsapi.com/static/img/back.png'