import { useEffect, useState } from 'react';
import BlackJackTable from './components/BlackJackTable';
import './App.css';

async function getNewDeck() {
  const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  if (!response.ok) {
    throw new Error(`Error: ${response}`)
  }
  const result = await response.json();
  return result.deck_id
}

function App() {
  const [deckId, setDeckId] = useState();

  useEffect(() => {
    getNewDeck().then(deck_id => setDeckId(deck_id))
  }, [])

  return (
    <div className="App">
      {deckId && <BlackJackTable deckId={deckId} />}
    </div>
  );
}

export default App;
