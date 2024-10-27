import React, { useState } from 'react';
import './App.css';
import Game from './Game';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [steps, setSteps] = useState(0);

  const handleStart = () => {
    setStartGame(true);
  };

  const handleSubmit = (stepCount) => {
    setSteps(stepCount);
    setStartGame(false); // Reset for new game if needed
  };

  return (
    <div className="App">
      <h1>Tower of Hanoi</h1>
      {!startGame ? (
        <div className="introduction">
          <p>
            The Tower of Hanoi is a classic mathematical puzzle that consists of three rods and a number of disks of different sizes which can slide onto any rod. The puzzle starts with the disks stacked in ascending order of size on one rod, the smallest disk on top. The objective is to move the entire stack to another rod, following these simple rules:
          </p>
          <ul>
            <li>Only one disk can be moved at a time.</li>
            <li>Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.</li>
            <li>No disk may be placed on top of a smaller disk.</li>
          </ul>
          <button onClick={handleStart}>Start Game</button>
        </div>
      ) : (
        <Game onSubmit={handleSubmit} />
      )}
      {steps > 0 && (
        <div className="congratulations">
          <h2>Congratulations, you have finished the game in {steps} steps!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
