import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { generate } from "./utils/words";
import useKeyPress from "./hooks/useKeyPress";

const initialWords = generate();

function App() {
  const [leftPadding, setLeftPadding] = useState(
      new Array(20).fill(' ').join(''),
  );

  useKeyPress(key => {
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substr(1))
      }
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substr(1);
      if (updatedIncomingChars.split('').length < 10) {
        updatedIncomingChars += '' + generate()
      }
      setIncomingChars(updatedIncomingChars);
    }
  });

  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className="Character-current">
            {currentChar}
          </span>
          <span>
            {incomingChars.substr(0, 20)}
          </span>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
