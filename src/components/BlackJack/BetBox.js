import React from 'react';
import { getOneCardFromDeck, getInitialCards } from '../../utils/helpers';
import { getTwoCards } from '../../utils/api';

const CurrencyFormatter = ({ value }) => {
    const formattedCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);

    return <span>{formattedCurrency}</span>;
};

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
    return (
        <div className="mid-panel">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {[5, 25, 100].map((amount, index) => (
                    <button
                        key={index}
                        className="BettingButton"
                        disabled={(userCards.length >= 2) || ((money - betAmount) < amount)}
                        onClick={(e) => {
                            e.preventDefault();
                            setBetAmount((prevAmount) => prevAmount + amount);
                        }}
                    >
                        ${amount}
                    </button>
                ))}
            </div>
            <div className='BetControlPanel'>
                <div className='BetLabel'>Bank: <span><CurrencyFormatter value={money} /></span></div>
                <div className='BetLabel'>Bet Amount: <span><CurrencyFormatter value={betAmount} /></span></div>
                <div className='BetLabel'>Win Amount: <span><CurrencyFormatter value={betAmount * 2} /></span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <button
                    className="BettingButton"
                    disabled={gameIsOver || userStands}
                    onClick={() => {
                        if (userCards.length >= 2) {
                            getOneCardFromDeck({ deckId, getOneCards, setUserCards });
                        } else {
                            getInitialCards({ deckId, getTwoCards, setUserCards, setDealersCards });
                        }
                        setGameStart((gameStart) => !gameStart);
                    }}
                >
                    {userCards.length >= 2 ? "Hit" : "Start"}
                </button>
                <button className="BettingButton" disabled={(userStands || gameIsOver) || (userCards.length < 2)} onClick={() => setUserStands(true)}>Stand</button>
                <button className="BettingButton" disabled={!userStands && !gameIsOver} onClick={() => {
                    reset();
                    setGameStart((gameStart) => !gameStart);
                }}>Reset</button>
            </div>
            {(gameIsOver || userStands) && winner && (
                <div className="winner-container" style={{ color: winner === 'DEALER Wins!' ? 'red' : 'green' }}>
                    {winner}
                    {winner !== 'DEALER Wins!' && (
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
                    )}
                </div>
            )}
        </div>
    );
};

export default BetBox;
