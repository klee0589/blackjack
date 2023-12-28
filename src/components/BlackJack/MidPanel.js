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
    winner
}) => {
    return <div className="mid-panel">
        <button disabled={gameIsOver || userStands} onClick={() => {
            getOneCardFromDeck({ deckId, getOneCards, setUserCards })
        }}>Hit</button>
        <button disabled={gameIsOver || userStands} onClick={() => setUserStands(true)}>Stand</button>
        <button disabled={!userStands && !gameIsOver} onClick={() => reset()}>Deal</button>
        <div>Bank: ${money}</div>
        <div>Bet Amount: ${betAmount}</div>
        <div>Win Amount: ${betAmount * 2}</div>
        <div>
            <form>
                <label form="bet">Bet:</label>
                <input type="text" id="bet" name="bet" onChange={(e) => setBetAmount(e.target.value)} />
            </form>
        </div>
        {(gameIsOver || userStands) && (
            <h1>
                {winner}
            </h1>
        )}
    </div>
}

export default MidPanel;