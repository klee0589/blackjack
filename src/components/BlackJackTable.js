import { useEffect, useState } from 'react';
import { getOneCards, backOfCardUrl } from '../utils/api';
import { grabCardValue, getOneCardFromDeck, determineWinner } from '../utils/helpers';
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
    const [gameStart, setGameStart] = useState(false);

    let dealerFirstCard = userStands || gameIsOver ? dealersCards[0]?.image : backOfCardUrl
    let restOfDealersCards = dealersCards.filter((_, index) => index !== 0)

    const reset = () => {
        setUserStands(false)
        setGameIsOver(false)
        setUserCards([])
        setDealersCards([])
        setBetAmount(0)
    }

    useEffect(() => {
        if (playersValue >= 21 || dealersValue >= 21) {
            setGameIsOver(true)
        }

        if (userStands) {
            setGameIsOver(true);
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
        }

        if (gameIsOver) {
            const winnerResult = determineWinner(playersValue, dealersValue, betAmount);
            setMoney(prevAmount => {
                return prevAmount + winnerResult.moneyChange;
            });
            setWinner(winnerResult.message);
            setGameStart(gameStart => !gameStart)
        }
    }, [gameIsOver, playersValue, dealersValue, betAmount, userStands]);

    useEffect(() => {
        if (deckId) {
            const fetchCard = async () => {
                await getOneCardFromDeck({ deckId, getOneCards, setUserCards: setDealersCards });
            };

            if (userStands && dealersValue < 15) {
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
                userCards={userCards}
                setUserStands={setUserStands}
                reset={reset}
                money={money}
                setBetAmount={setBetAmount}
                betAmount={betAmount}
                gameStart={gameStart}
                setGameStart={setGameStart}
                setDealersCards={setDealersCards}
                winner={winner} />
            <div className='Players'>
                {
                    (userStands || gameIsOver) && <>
                        <h1>DEALER</h1>
                        <h3>{gameIsOver && dealersValue}</h3>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginRight: '2px' }}>
                                <img src={dealerFirstCard} alt={'dealers_first_card'} height={150} />
                            </div>
                            <PlayingCards userCards={restOfDealersCards} />
                        </div></>
                }
            </div>
        </div>
    );
}

export default BlackJackTable;
