import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [randomVerse, setRandomVerse] = useState('');
  const [specificVerse, setSpecificVerse] = useState('');
  const [verseInput, setVerseInput] = useState('');
  const [error, setError] = useState('');

  const fetchRandomVerse = () => {
    axios
      .get('http://labs.bible.org/api/?passage=random&formatting=plain')
      .then(response => {
        setRandomVerse(response.data);
        setError('');
      })
      .catch(err => {
        setError('Error fetching random verse');
      });
  };

  const fetchSpecificVerse = () => {
    if (verseInput.trim() === '') {
      setError('Please enter a valid verse reference');
      return;
    }

    axios
      .get(`http://labs.bible.org/api/?passage=${verseInput}&formatting=plain`)
      .then(response => {
        setSpecificVerse(response.data);
        setError('');
      })
      .catch(err => {
        setError('Error fetching verse');
      });
  };

  return (
    <div>
      <h1>Bible Verse App</h1>
     
      <button onClick={fetchRandomVerse}>Get Random Verse</button>
      <div>
        <h2>Random Verse:</h2>
        <p>{randomVerse}</p>
      </div>

    
      <div>
        <input
          type="text"
          placeholder="Enter verse (e.g., John 3:16)"
          value={verseInput}
          onChange={e => setVerseInput(e.target.value)}
        />
        <button onClick={fetchSpecificVerse}>Search for Verse</button>
      </div>

      <div>
        <h2>Search Result:</h2>
        <p>{specificVerse}</p>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
