const PlayingCards = ({ userCards }) => {
    return userCards.map((card, index) => <div key={index} style={{ marginRight: '2px' }}><img src={card?.image} alt={card.code} height={150} key={index} /></div>)
}

export default PlayingCards;