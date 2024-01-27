import React from 'react';
import PropTypes from 'prop-types';

const PlayingCards = ({ userCards, playersValue }) => {
    return (
        <div style={{ display: 'flex' }}>
            {userCards.map((card, index) => (
                <div key={index}>
                    <img src={card?.image} alt={card.code} height={150} />
                </div>
            ))}
            <h3>{playersValue}</h3>
        </div>
    );
};

PlayingCards.propTypes = {
    userCards: PropTypes.array.isRequired,
    playersValue: PropTypes.number.isRequired
};

export default PlayingCards;
