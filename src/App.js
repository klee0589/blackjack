import React, { useEffect, useState } from 'react';
import BlackJackTable from './components/BlackJack/BlackJackTable';
import { getNewDeck } from './utils/api';
import './App.css';

function App() {
  const [deckId, setDeckId] = useState(null);

  useEffect(() => {
    getNewDeck().then(deck_id => setDeckId(deck_id))
  }, [])

  return (
    <div className="App">
      <BlackJackTable deckId={deckId} />
    </div>
  );
}

export default App;
