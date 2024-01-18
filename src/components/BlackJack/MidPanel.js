import { getOneCardFromDeck } from '../../utils/helpers';

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
    gameStart,
    setGameStart
}) => {
    return <div className="mid-panel">
        <button disabled={gameIsOver || userStands} onClick={() => {
            getOneCardFromDeck({ deckId, getOneCards, setUserCards })
            setGameStart(gameStart => !gameStart)
        }}>Hit</button>
        <button disabled={gameIsOver || userStands} onClick={() => setUserStands(true)}>Stand</button>
        <button disabled={!userStands && !gameIsOver} onClick={() => {
            reset()
            setGameStart(gameStart => !gameStart)
        }}>Deal</button>
        <div>Bank: ${money}</div>
        <div>Bet Amount: ${betAmount}</div>
        <div>Win Amount: ${betAmount * 2}</div>
        <div>
            <form>
                <label form="bet">Bet:</label>
                <button disabled={(userStands || gameIsOver) || ((money - betAmount) < 5)} onClick={(e) => {
                    e.preventDefault()
                    setBetAmount(betAmount => betAmount + 5)
                }}>$5</button>
                <button disabled={(userStands || gameIsOver) || ((money - betAmount) < 25)} onClick={(e) => {
                    e.preventDefault()
                    setBetAmount(betAmount => betAmount + 25)
                }}>$25</button>
                <button disabled={(userStands || gameIsOver) || ((money - betAmount) < 100)} onClick={(e) => {
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