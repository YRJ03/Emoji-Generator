import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [emojiList, setEmojiList] = useState([]);
  const [randomEmoji, setRandomEmoji] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchEmoji = async () => {
      try {
        const response = await fetch(
          'https://emoji-api.com/emojis?access_key=9c7371a64001b1fe2e0dee2314654ef48704cd01'
        );
        const data = await response.json();
        setEmojiList(data);
      } catch (error) {
        console.error('Error fetching emojis:', error);
      }
    };

    fetchEmoji();
  }, []);

  const generateRandomEmoji = () => {
    if (emojiList.length === 0) return;
    
    const randomNum = Math.floor(Math.random() * emojiList.length);
    const emoji = emojiList[randomNum];
    
    const descriptionParts = emoji.unicodeName.split('.');
    const descriptionText = descriptionParts[1].substring(2);
    
    setRandomEmoji(emoji.character);
    setDescription(descriptionText);
  };

  return (
    <div className="app-container">
      <h1>Random Emoji Generator</h1>
      <div className="emoji-container">
        <span className="emoji">{randomEmoji}</span>
        <p id="description" className="emoji-description">{description}</p>
      </div>
      <button className="generate-btn" onClick={generateRandomEmoji}>
        Generate Emoji
      </button>
    </div>
  );
};

export default App;
