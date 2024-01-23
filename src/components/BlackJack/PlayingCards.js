import React from 'react';
import PropTypes from 'prop-types';

const PlayingCards = ({ userCards }) => {
    return (
        <div>
            {userCards.map((card, index) => (
                <div key={index} style={{ marginRight: '2px' }}>
                    <img src={card?.image} alt={card.code} height={150} />
                </div>
            ))}
        </div>
    );
};

PlayingCards.propTypes = {
    userCards: PropTypes.array.isRequired,
};

export default PlayingCards;
