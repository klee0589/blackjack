import { useEffect, useState } from 'react';
import { getOneCards, getTwoCards, backOfCardUrl } from '../utils/api';
import { grabCardValue, getInitialCards, getOneCardFromDeck } from '../utils/helpers';
import PlayingCards from './PlayingCards';

const BlackJackTable = ({ deckId }) => {
    const [userCards, setUserCards] = useState([]);
    const [dealersCards, setDealersCards] = useState([]);
    const [money, setMoney] = useState(100);
    const [betAmount, setBetAmount] = useState(0);
    const [winner, setWinner] = useState('');

    let playersValue = userCards.reduce((sum, card) => sum + grabCardValue(card.value), 0)
    let dealersValue = dealersCards.reduce((sum, card) => sum + grabCardValue(card.value), 0)

    const [gameIsOver, setGameIsOver] = useState(false);
    const [userStands, setUserStands] = useState(false);

    let dealerFirstCard = userStands || gameIsOver ? dealersCards[0]?.image : backOfCardUrl
    let restOfDealersCards = dealersCards.filter((_, index) => index !== 0)

    useEffect(() => {
        if (gameIsOver) {
            checkWinner();
        }
    }, [gameIsOver])

    useEffect(() => {
        if (deckId) {
            getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
        }
    }, [deckId])

    useEffect(() => {
        if (playersValue >= 21 || dealersValue >= 21) {
            setGameIsOver(true)
        }
    }, [playersValue, dealersValue])

    useEffect(() => {
        if (deckId) {
            const fetchCard = async () => {
                await getOneCardFromDeck({ deckId, getOneCards, setUserCards: setDealersCards });
            };

            if (userStands && (dealersValue <= 15 && dealersValue <= playersValue)) {
                fetchCard();
            }
        }
    }, [userStands, deckId, gameIsOver, dealersCards, dealersValue, playersValue]);

    const reset = () => {
        setUserStands(false)
        setGameIsOver(false)
        setUserCards([])
        setDealersCards([])
        getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
    }

    const checkWinner = () => {
        if (playersValue > 21 || (dealersValue <= 21 && dealersValue > playersValue)) {
            setMoney(prevAmount => prevAmount - (betAmount * 2));
            setBetAmount(0);
            setWinner("DEALER Wins!");
        } else if (dealersValue > 21 || (playersValue <= 21 && playersValue > dealersValue)) {
            setMoney(prevAmount => prevAmount + (betAmount * 2));
            setBetAmount(0);
            setWinner("PLAYER Wins!");
        } else {
            setWinner("It's a Tie!");
        }
    };

    return (
        <div className="BlackJackTable">
            <div className='Players'>
                <h1>PLAYER</h1>
                <h3>{playersValue}</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PlayingCards userCards={userCards} />
                </div>
            </div>
            <div style={{ background: "white" }}>
                <button disabled={gameIsOver || userStands} onClick={() => {
                    getOneCardFromDeck({ deckId, getOneCards, setUserCards })
                }}>Hit</button>
                <button disabled={gameIsOver || userStands} onClick={() => setUserStands(true)}>Stand</button>
                <button disabled={!userStands && !gameIsOver} onClick={() => reset()}>Reset</button>
                <div><h2>Bank: ${money}</h2></div>
                <div><h2>Bet Amount: ${betAmount}</h2></div>
                <div><h2>Win Amount: ${betAmount * 2}</h2></div>
                <div>
                    <form>
                        <label form="bet">Bet:</label>
                        <input type="text" id="bet" name="bet" onChange={(e) => setBetAmount(e.target.value)} />
                    </form>
                </div>
                <div>
                    {gameIsOver && (
                        <h1>
                            {winner}
                        </h1>
                    )}
                </div>
            </div>
            <div className='Players'>
                <h1>DEALER</h1>
                <h3>{dealersValue}</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '2px' }}>
                        <img src={dealerFirstCard} alt={'dealers_first_card'} height={150} />
                    </div>
                    <PlayingCards userCards={restOfDealersCards} />
                </div>
            </div>
        </div>
    );
}

export default BlackJackTable;
