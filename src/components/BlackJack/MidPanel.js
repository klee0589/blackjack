import { getOneCardFromDeck, getInitialCards } from '../../utils/helpers';
import { getTwoCards } from '../../utils/api';

const MidPanel = ({
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
        <button disabled={gameIsOver || userStands} onClick={() => {
            if (userCards.length >= 2) {
                getOneCardFromDeck({ deckId, getOneCards, setUserCards })
            } else {
                getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
            }
            setGameStart(gameStart => !gameStart)
        }}>{userCards.length >= 2 ? "Hit" : "Start"}</button>
        <button disabled={(userStands || gameIsOver) || (userCards.length < 2)} onClick={() => setUserStands(true)}>Stand</button>
        <button disabled={!userStands && !gameIsOver} onClick={() => {
            reset()
            setGameStart(gameStart => !gameStart)
        }}>Reset</button>
        <div>Bank: ${money}</div>
        <div>Bet Amount: ${betAmount}</div>
        <div>Win Amount: ${betAmount * 2}</div>
        <div>
            <form>
                <label form="bet">Bet:</label>
                <button disabled={(userCards.length >= 2) || ((money - betAmount) < 5)} onClick={(e) => {
                    e.preventDefault()
                    setBetAmount(betAmount => betAmount + 5)
                }}>$5</button>
                <button disabled={(userCards.length >= 2) || ((money - betAmount) < 25)} onClick={(e) => {
                    e.preventDefault()
                    setBetAmount(betAmount => betAmount + 25)
                }}>$25</button>
                <button disabled={(userCards.length >= 2) || ((money - betAmount) < 100)} onClick={(e) => {
                    e.preventDefault()
                    setBetAmount(betAmount => betAmount + 100)
                }}>$100</button>
            </form>
        </div>
        {(gameIsOver || userStands) && winner && (
            <h1 style={{ color: 'green', background: 'white', borderRadius: '10px' }}>
                {winner}
            </h1>
        )}
    </div>
}

export default MidPanel;