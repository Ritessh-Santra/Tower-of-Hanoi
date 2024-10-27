import React, { useState } from 'react';

const Game = ({ onSubmit }) => {
  const [rods, setRods] = useState([[3, 2, 1], [], []]); // Initial rod state
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState('');
  const rodNames = ['A', 'B', 'C'];
  const [draggedDisk, setDraggedDisk] = useState(null);

  const handleDragStart = (rodIndex, disk) => {
    setDraggedDisk({ rodIndex, disk });
  };

  const handleDrop = (toRod) => {
    if (draggedDisk) {
      const { rodIndex: fromRod, disk } = draggedDisk;
      moveDisk(fromRod, toRod);
      setDraggedDisk(null);
    }
  };

  const moveDisk = (fromRod, toRod) => {
    const newRods = [...rods];
    const fromStack = newRods[fromRod];
    const toStack = newRods[toRod];

    if (
      fromStack.length > 0 &&
      (toStack.length === 0 || toStack[toStack.length - 1] > fromStack[fromStack.length - 1])
    ) {
      const disk = fromStack.pop();
      toStack.push(disk);
      setRods(newRods);
      setSteps(steps + 1);
      setMessage('');
    } else {
      setMessage('Invalid move! Try again.');
    }
  };

  const checkWinningCondition = () => rods[2].length === 3 && JSON.stringify(rods[2]) === JSON.stringify([3, 2, 1]);

  const handleSubmit = () => {
    if (checkWinningCondition()) {
      onSubmit(steps);
    } else {
      setMessage('The game is not complete yet.');
    }
  };

  return (
    <div className="game">
      <h2>Tower of Hanoi - Move the Disks</h2>
      {message && <div className="error-message">{message}</div>}

      <div className="rods">
        {rods.map((rod, rodIndex) => (
          <div key={rodIndex} style={{ textAlign: 'center' }}>
            <div
              className="rod"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(rodIndex)}
            >
              <h3 style={{ visibility: 'hidden' }}>Rod {rodNames[rodIndex]}</h3> {/* Hidden header */}
              {rod.map((disk, diskIndex) => (
                <div
                  key={diskIndex}
                  className={`disk disk-${disk}`}
                  draggable
                  onDragStart={() => handleDragStart(rodIndex, disk)}
                >
                  {disk}
                </div>
              ))}
            </div>
            <div className="rod-base"></div>
            <div className="rod-label">Rod {rodNames[rodIndex]}</div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit</button>
      <p>Steps: {steps}</p>
    </div>
  );
};

export default Game;
