import { useEffect, useState } from 'react';
import { getOneCards, getTwoCards, backOfCardUrl } from '../utils/api';
import { grabCardValue, getInitialCards, getOneCardFromDeck } from '../utils/helpers';
import PlayingCards from './PlayingCards';

const BlackJackTable = ({ deckId }) => {
    const [userCards, setUserCards] = useState([]);
    let playersValue = userCards.reduce((sum, card) => sum + grabCardValue(card.value), 0)
    const [dealersCards, setDealersCards] = useState([]);
    let dealersValue = dealersCards.reduce((sum, card) => sum + grabCardValue(card.value), 0)
    const [gameIsOver, setGameIsOver] = useState(false);
    const [userStands, setUserStands] = useState(false);
    let dealerFirstCard = userStands || gameIsOver ? dealersCards[0]?.image : backOfCardUrl
    let restOfDealersCards = dealersCards.filter((_, index) => index !== 0)

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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PlayingCards userCards={userCards} />
                </div>
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        <div style={{ marginRight: '2px' }}>
                            <img src={dealerFirstCard} alt={'dealers_first_card'} height={150} />
                        </div>
                    }
                    <PlayingCards userCards={restOfDealersCards} />
                </div>
            </div>
        </div>
    );
}

export default BlackJackTable;
