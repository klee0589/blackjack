import { useEffect, useState } from 'react';
import BlackJackTable from './components/BlackJack/BlackJackTable';
import './App.css';

async function getNewDeck() {
  const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=8');
  if (!response.ok) {
    throw new Error(`Error: ${response}`)
  }
  const result = await response.json();
  return result.deck_id
}

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
