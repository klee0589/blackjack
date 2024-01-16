import { useEffect, useState } from 'react';
import { getOneCards, getTwoCards, backOfCardUrl } from '../utils/api';
import { grabCardValue, getInitialCards, getOneCardFromDeck } from '../utils/helpers';
import PlayingCards from './PlayingCards';
import MidPanel from './BlackJack/MidPanel';

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

    const reset = () => {
        setUserStands(false)
        setGameIsOver(false)
        setUserCards([])
        setDealersCards([])
        getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
    }

    useEffect(() => {
        if (deckId) {
            getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
        }
    }, [deckId])


    useEffect(() => {
        const determineWinner = (playerValue, dealerValue) => {
            if (playerValue > 21 || (dealerValue <= 21 && dealerValue > playerValue)) {
                return { message: "DEALER Wins!", moneyChange: -betAmount * 2 };
            } else if (dealerValue > 21 || (playerValue <= 21 && playerValue > dealerValue)) {
                return { message: "PLAYER Wins!", moneyChange: betAmount * 2 };
            } else {
                return { message: "It's a Tie!", moneyChange: 0 };
            }
        };

        if (gameIsOver) {
            const winnerResult = determineWinner(playersValue, dealersValue);
            setMoney(prevAmount => {
                return prevAmount + winnerResult.moneyChange;
            });
            setBetAmount(0);
            setWinner(winnerResult.message);
        }
    }, [gameIsOver, playersValue, dealersValue, betAmount]);

    useEffect(() => {
        if (playersValue >= 21 || dealersValue >= 21) {
            setGameIsOver(true)
        }
    }, [playersValue, dealersValue, userStands])

    useEffect(() => {
        if (deckId) {
            const fetchCard = async () => {
                await getOneCardFromDeck({ deckId, getOneCards, setUserCards: setDealersCards });
            };

            if (userStands && dealersValue < 17) {
                fetchCard();
            }
        }
    }, [userStands, deckId, gameIsOver, dealersCards, dealersValue, playersValue]);

    return (
        <div className="BlackJackTable">
            <div className='Players'>
                <h1>PLAYER</h1>
                <h3>{playersValue}</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PlayingCards userCards={userCards} />
                </div>
            </div>
            <MidPanel gameIsOver={gameIsOver}
                userStands={userStands}
                deckId={deckId}
                getOneCards={getOneCards}
                setUserCards={setUserCards}
                setUserStands={setUserStands}
                reset={reset}
                money={money}
                setBetAmount={setBetAmount}
                betAmount={betAmount}
                winner={winner} />
            <div className='Players'>
                <h1>DEALER</h1>
                <h3>{gameIsOver && dealersValue}</h3>
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
