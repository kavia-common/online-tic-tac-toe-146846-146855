import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * Ocean Professional themed Tic Tac Toe game.
 * - Centered layout with header
 * - Player turn indicator
 * - 3x3 grid with interactive squares
 * - Win/draw detection
 * - Restart button
 * - Modern minimalist style with blue & amber accents, rounded corners, shadows, and smooth transitions
 */

// Utility to compute winner and winning line
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

// PUBLIC_INTERFACE
export default function App() {
  /** Theme variables are applied via CSS in App.css. We scope a custom theme here. */
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const { winner, line } = useMemo(() => calculateWinner(board), [board]);
  const isBoardFull = useMemo(() => board.every(Boolean), [board]);
  const isDraw = !winner && isBoardFull;

  const currentPlayer = xIsNext ? 'X' : 'O';

  // PUBLIC_INTERFACE
  const handleSquareClick = (idx) => {
    if (board[idx] || winner) return; // ignore if filled or finished
    const next = board.slice();
    next[idx] = currentPlayer;
    setBoard(next);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="ttt-app" data-theme="ocean">
      <main className="ttt-container">
        <header className="ttt-header" role="banner" aria-label="Tic Tac Toe Header">
          <h1 className="ttt-title">
            <span className="accent">Tic</span> Tac <span className="accent-amber">Toe</span>
          </h1>
          <p className="ttt-subtitle">Play the classic game with a modern twist.</p>
        </header>

        <section className="ttt-status" aria-live="polite">
          {!winner && !isDraw && (
            <div className="status-chip" title="Current player">
              Player <strong className="chip-player">{currentPlayer}</strong>'s turn
            </div>
          )}
          {winner && (
            <div className="status-chip status-win" title="Game result">
              Player <strong className="chip-player">{winner}</strong> wins!
            </div>
          )}
          {isDraw && !winner && (
            <div className="status-chip status-draw" title="Game result">
              It's a draw!
            </div>
          )}
        </section>

        <section className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          {board.map((val, idx) => {
            const isWinning = line.includes(idx);
            return (
              <button
                key={idx}
                role="gridcell"
                aria-label={`Cell ${idx + 1} ${val ? `contains ${val}` : 'empty'}`}
                className={`ttt-cell ${isWinning ? 'cell-win' : ''} ${!val ? 'cell-empty' : ''}`}
                onClick={() => handleSquareClick(idx)}
              >
                <span className={`cell-mark ${val === 'X' ? 'mark-x' : val === 'O' ? 'mark-o' : ''}`}>
                  {val}
                </span>
              </button>
            );
          })}
        </section>

        <div className="ttt-actions">
          <button className="btn-restart" onClick={handleRestart} aria-label="Restart game">
            Restart
          </button>
        </div>

        <footer className="ttt-footer" aria-label="Footer">
          <p className="ttt-footnote">Ocean Professional theme — Blue & Amber accents</p>
        </footer>
      </main>
    </div>
  );
}
