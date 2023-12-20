import { useEffect, useState } from 'react';
import { getOneCards, getTwoCards, backOfCardUrl } from '../utils/api';
import { grabCardValue, getInitialCards, getOneCardFromDeck } from '../utils/helpers';

const BlackJackTable = ({ deckId }) => {
    const [userCards, setUserCards] = useState([]);
    let playersValue = userCards.reduce((sum, card) => sum + grabCardValue(card.value), 0)
    const [dealersCards, setDealersCards] = useState([]);
    let dealersValue = dealersCards.reduce((sum, card) => sum + grabCardValue(card.value), 0)
    const [gameIsOver, setGameIsOver] = useState(false);
    const [userStands, setUserStands] = useState(false);
    const [dealerTurn, setDealerTurn] = useState(false);

    useEffect(() => {
        getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
    }, [deckId])

    useEffect(() => {
        if (playersValue >= 21 || dealersValue >= 21) {
            setGameIsOver(true)
        }
    }, [playersValue, dealersValue])

    useEffect(() => {
        function dealDealersCards() {
            if (dealersValue < playersValue && !gameIsOver) {
                getOneCardFromDeck({ deckId, getOneCards, setUserCards: setDealersCards });
            } else {
                setDealerTurn(false);
            }
        }

        if (userStands && !dealerTurn) {
            setDealerTurn(true);
            dealDealersCards();
        } else if (dealerTurn && !gameIsOver) {
            dealDealersCards();
        }
    }, [userStands, gameIsOver, dealerTurn, dealersValue, playersValue, deckId]);

    function reset() {
        setGameIsOver(false)
        setUserCards([])
        setDealersCards([])
        getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
    }

    return (
        <div className="BlackJackTable">
            <div className='Players'>
                <h1>PLAYER {gameIsOver && playersValue <= 21 && 'Wins'}</h1>
                <button disabled={gameIsOver} onClick={() => getOneCardFromDeck({ deckId, getOneCards, setUserCards })}>Hit</button>
                <button onClick={() => setUserStands(true)}>Stand</button>
                <button onClick={() => reset()}>Reset</button>
                <h3>{playersValue}</h3>
                {
                    userCards.map((card, index) => <img src={card?.image} alt={card.code} height={150} key={index} />)
                }
            </div>
            <div className='Players'>
                <h1>DEALER {gameIsOver && dealersValue <= 21 && 'Wins'}</h1>
                <h3>{dealersValue}</h3>
                {
                    <img src={userStands || gameIsOver ? dealersCards[0]?.image : backOfCardUrl} alt={'dealers_first_card'} height={150} />
                }
                {
                    dealersCards.map((card, index) => index !== 0 && <img src={card?.image} alt={card.code} height={150} />)
                }
            </div>
        </div>
    );
}

export default BlackJackTable;
