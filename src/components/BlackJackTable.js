import { useEffect, useState } from 'react';

async function getTwoCards(deck_id) {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`);
    if (!response.ok) {
        throw new Error(`Error: ${response}`)
    }
    const result = await response.json();
    return result
}

async function getOneCards(deck_id) {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    if (!response.ok) {
        throw new Error(`Error: ${response}`)
    }
    const result = await response.json();
    return result
}

const BlackJackTable = ({ deckId }) => {
    const [userCards, setUserCards] = useState([]);
    const [dealersCards, setDealersCards] = useState([]);
    const [userStands, setUserStands] = useState(false);

    useEffect(() => {
        getTwoCards(deckId).then(({ cards }) => {
            setUserCards(cards)
        })
        getTwoCards(deckId).then(({ cards }) => {
            setDealersCards(cards)
        })
    }, [deckId])

    useEffect(() => {
        if (userStands) {
            // start dealers cards
        }
    }, [userStands])

    return (
        <div className="BlackJackTable">
            <div className='Players'>
                <h1>PLAYER</h1>
                <button onClick={() => {
                    getOneCards(deckId).then(({ cards }) => {
                        setUserCards(preCards => [...preCards, ...cards])
                    })
                }}>Hit</button>
                <button onClick={setUserStands(true)}>Stand</button>
                {
                    userCards.map((card) => <img src={card.image} alt={card.code} height={150} />)
                }
            </div>
            <div className='Players'>
                <h1>DEALER</h1>
                {
                    dealersCards.map((card) => <img src={card.image} alt={card.code} height={150} />)
                }
            </div>
        </div>
    );
}

export default BlackJackTable;
