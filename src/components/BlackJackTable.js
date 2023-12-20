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

    useEffect(() => {
        getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
    }, [deckId])

    useEffect(() => {
        if (playersValue >= 21 || dealersValue >= 21) {
            setGameIsOver(true)
        }
    }, [playersValue, dealersValue])

    useEffect(() => {
        const fetchCard = async () => {
            await getOneCardFromDeck({ deckId, getOneCards, setUserCards: setDealersCards });
        };

        if (userStands && dealersValue <= 15 && dealersValue < playersValue) {
            fetchCard();
        }
    }, [userStands, deckId, gameIsOver, dealersCards, dealersValue, playersValue]);

    function reset() {
        setUserStands(false)
        setGameIsOver(false)
        setUserCards([])
        setDealersCards([])
        getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
    }

    return (
        <div className="BlackJackTable">
            <div className='Players'>
                <h1>PLAYER {gameIsOver && playersValue <= 21 && 'Wins'}</h1>
                <h3>{playersValue}</h3>
                {
                    userCards.map((card, index) => <img src={card?.image} alt={card.code} height={150} key={index} />)
                }
            </div>
            <div>
                <button disabled={gameIsOver || userStands} onClick={() => {

                    getOneCardFromDeck({ deckId, getOneCards, setUserCards })
                }}>Hit</button>
                <button onClick={() => setUserStands(true)}>Stand</button>
                <button disabled={!userStands && !gameIsOver} onClick={() => reset()}>Reset</button>
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
