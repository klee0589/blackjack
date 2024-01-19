import { getOneCardFromDeck, getInitialCards } from '../../utils/helpers';
import { getTwoCards } from '../../utils/api';

const BetBox = ({
    gameIsOver,
    userStands,
    deckId,
    getOneCards,
    setUserCards,
    setUserStands,
    reset,
    money,
    betAmount,
    setBetAmount,
    winner,
    setGameStart,
    userCards,
    setDealersCards
}) => {
    return <div className="mid-panel">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>Bet:</div>
            <button className="BettingButton" disabled={(userCards.length >= 2) || ((money - betAmount) < 5)} onClick={(e) => {
                e.preventDefault()
                setBetAmount(betAmount => betAmount + 5)
            }}>$5</button>
            <button className="BettingButton" disabled={(userCards.length >= 2) || ((money - betAmount) < 25)} onClick={(e) => {
                e.preventDefault()
                setBetAmount(betAmount => betAmount + 25)
            }}>$25</button>
            <button className="BettingButton" disabled={(userCards.length >= 2) || ((money - betAmount) < 100)} onClick={(e) => {
                e.preventDefault()
                setBetAmount(betAmount => betAmount + 100)
            }}>$100</button>
        </div>
        <div>Bank: ${money}</div>
        <div>Bet Amount: ${betAmount}</div>
        <div>Win Amount: ${betAmount * 2}</div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <button className="BettingButton" disabled={gameIsOver || userStands} onClick={() => {
                if (userCards.length >= 2) {
                    getOneCardFromDeck({ deckId, getOneCards, setUserCards })
                } else {
                    getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
                }
                setGameStart(gameStart => !gameStart)
            }}>{userCards.length >= 2 ? "Hit" : "Start"}</button>
            <button className="BettingButton" disabled={(userStands || gameIsOver) || (userCards.length < 2)} onClick={() => setUserStands(true)}>Stand</button>
            <button className="BettingButton" disabled={!userStands && !gameIsOver} onClick={() => {
                reset()
                setGameStart(gameStart => !gameStart)
            }}>Reset</button>
        </div>
        {(gameIsOver || userStands) && winner && (
            <div style={{ color: winner === 'DEALER Wins!' ? 'red' : 'green', background: 'white', borderRadius: '10px', height: '200px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '10px', padding: '5px' }}>
                {winner}
                {
                    winner !== 'DEALER Wins!' &&
                    <iframe
                        title="Giphy"
                        src="https://giphy.com/embed/12Eo7WogCAoj84"
                        padding="0"
                        width="200"
                        height="200"
                        frameBorder="0"
                        className="giphy-embed"
                        allowFullScreen
                    ></iframe>
                }
            </div>
        )}
    </div>
}

export default BetBox;