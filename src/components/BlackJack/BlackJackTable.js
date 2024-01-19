import { useEffect, useState } from 'react';
import { getOneCards, backOfCardUrl } from '../../utils/api';
import { grabCardValue, getOneCardFromDeck, determineWinner } from '../../utils/helpers';
import PlayingCards from './PlayingCards';
import BetBox from './BetBox';

const BlackJackTable = ({ deckId }) => {
    const [userCards, setUserCards] = useState([]);
    const [dealersCards, setDealersCards] = useState([]);
    const [money, setMoney] = useState(100);
    const [betAmount, setBetAmount] = useState(0);
    const [winner, setWinner] = useState('');
    const [runningCount, setRunningCount] = useState(0);
    const [trueCount, setTrueCount] = useState(0);

    let playersValue = grabCardValue({ cards: userCards })
    let dealersValue = grabCardValue({ cards: dealersCards })

    const [gameIsOver, setGameIsOver] = useState(false);
    const [userStands, setUserStands] = useState(false);
    const [gameStart, setGameStart] = useState(false);

    let dealerFirstCard = userStands || gameIsOver ? dealersCards[0]?.image : backOfCardUrl
    let restOfDealersCards = dealersCards.filter((_, index) => index !== 0)

    const updateCount = (card) => {
        const cardValue = Number(card.value);
        const cardPoints = isNaN(cardValue) ? (card.value === 'ACE' ? -1 : -10) : cardValue;

        setRunningCount(runningCount + cardPoints);

        const decksRemaining = 8;
        const cardsRemaining = decksRemaining * 52 - userCards.length - dealersCards.length;

        const trueCountValue = Math.round(runningCount / (cardsRemaining / 52));
        setTrueCount(trueCountValue);
    };

    const reset = () => {
        setUserStands(false)
        setGameIsOver(false)
        setUserCards([])
        setDealersCards([])
        setBetAmount(0)
    }

    useEffect(() => {
        userCards.map(userCard =>
            updateCount(userCard)
        )
    }, [userCards])

    useEffect(() => {
        if (playersValue >= 21 || dealersValue >= 21) {
            setGameIsOver(true)
        }

        if (gameIsOver || userStands) {
            determineWinner({ playersValue, dealersValue, betAmount, setMoney, setBetAmount, setWinner });
            setGameStart(gameStart => !gameStart)
        }
    }, [gameIsOver, playersValue, dealersValue, betAmount, userStands]);

    useEffect(() => {
        if (deckId) {
            const fetchCard = async () => {
                await getOneCardFromDeck({ deckId, getOneCards, setUserCards: setDealersCards });
            };

            if (userStands && dealersValue <= 15) {
                fetchCard();
            }
        }
    }, [userStands, deckId, gameIsOver, dealersCards, dealersValue, playersValue]);

    return (
        <div className="BlackJackTable">
            {!money && <div className='Overlay'><h1 style={{ color: 'red' }}>YOU BROKE</h1><button className='Restart' onClick={() => {
                reset()
                setMoney(100)
            }}>RESTART</button></div>}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '75%' }}>
                <div className='Players'>
                    <h3>Running Count: {runningCount}</h3>
                    <h3>True Count: {trueCount}</h3>
                    <div className='BettingTips'>Tip:
                        <p>Positive True Count: Increase bets. A positive count indicates a higher likelihood of favorable cards (e.g., 10s and Aces), providing the player with an edge. Betting more in these situations maximizes potential winnings.</p>
                        <p>Negative True Count: Decrease or maintain bets. A negative count suggests an excess of low-value cards, reducing the player's advantage. Betting less during such times helps minimize potential losses.</p></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h3>PLAYER</h3>
                        <PlayingCards userCards={userCards} />
                        <h3>{gameStart && playersValue}</h3>
                    </div>
                </div>
                <div className='Players'>
                    {
                        (userStands || gameIsOver) && <>
                            <h1>DEALER</h1>
                            <h3>{dealersValue}</h3>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ marginRight: '2px' }}>
                                    <img src={dealerFirstCard} alt={'dealers_first_card'} height={150} />
                                </div>
                                <PlayingCards userCards={restOfDealersCards} />
                            </div></>
                    }
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '25%' }}>
                <BetBox gameIsOver={gameIsOver}
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
            </div>
        </div>
    );
}

export default BlackJackTable;
