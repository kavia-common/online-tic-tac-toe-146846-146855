import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * Ocean Professional Tic Tac Toe
 * - Clean, modern UI with subtle gradients, rounded corners, smooth transitions
 * - No external API or env vars
 * - Two-player local play with win/draw detection and reset
 */

// Helper to calculate winner and winning line
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

// Square Component
function Square({ value, onClick, highlight, disabled }) {
  return (
    <button
      className={`ttt-square ${highlight ? 'ttt-square--highlight' : ''} ${value ? 'ttt-square--filled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Board cell ${value ? value : 'empty'}`}
    >
      {value}
    </button>
  );
}

// Board Component
function Board({ squares, onPlay, winningLine, isOver }) {
  const renderSquare = (i) => {
    const highlight = winningLine?.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onPlay(i)}
        highlight={highlight}
        disabled={isOver || Boolean(squares[i])}
      />
    );
  };

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="ttt-row" role="row">
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <div key={index} role="gridcell" className="ttt-cell">
                {renderSquare(index)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Status Component
function Status({ current, winner, isDraw }) {
  if (winner) {
    return (
      <div className="ttt-status ttt-status--win" role="status" aria-live="polite">
        Player {winner} wins!
      </div>
    );
  }
  if (isDraw) {
    return (
      <div className="ttt-status ttt-status--draw" role="status" aria-live="polite">
        It’s a draw.
      </div>
    );
  }
  return (
    <div className="ttt-status" role="status" aria-live="polite">
      Player <span className="ttt-turn">{current}</span> turn
    </div>
  );
}

// Controls Component
function Controls({ onReset, disabled }) {
  return (
    <div className="ttt-controls">
      <button className="btn btn-primary" onClick={onReset} disabled={disabled} aria-label="Restart game">
        Restart
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = useMemo(() => calculateWinner(squares), [squares]);
  const winner = result?.player || null;
  const winningLine = result?.line || null;

  const isBoardFull = useMemo(() => squares.every(Boolean), [squares]);
  const isDraw = !winner && isBoardFull;
  const currentPlayer = xIsNext ? 'X' : 'O';
  const isOver = Boolean(winner) || isDraw;

  const handlePlay = (index) => {
    if (squares[index] || isOver) return;
    setSquares((prev) => {
      const copy = prev.slice();
      copy[index] = currentPlayer;
      return copy;
    });
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="ttt-app">
      <div className="ttt-surface">
        <header className="ttt-header">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <p className="ttt-subtitle">Ocean Professional Edition</p>
        </header>

        <main className="ttt-main">
          <div className="ttt-gradient" aria-hidden="true" />
          <Status current={currentPlayer} winner={winner} isDraw={isDraw} />
          <Board
            squares={squares}
            onPlay={handlePlay}
            winningLine={winningLine}
            isOver={isOver}
          />
          <Controls onReset={resetGame} disabled={false} />
        </main>
      </div>
      <footer className="ttt-footer">
        Built with React • Two Player Local
      </footer>
    </div>
  );
}

export default App;
