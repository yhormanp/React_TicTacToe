import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import "./index.css";
import calculateWinner from "./utils/utils";

const Game = () => {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    status: "Next player: X",
    existAWinner: false,
    stepNumber: 0,
  });

  const history = state.history.slice(0, state.stepNumber + 1)
  // const history = state.history;
  const current = history[state.stepNumber];
  // const current = history[history.length - 1]
  // const history = state.history;
  // const current = history[history.length - 1];

  useEffect(() => {
    // const history = state.history.slice(0, state.stepNumber + 1);
    // const current = history[state.stepNumber];
    const winner = calculateWinner(current.squares);
    let newStatus;
    if (winner) {
      newStatus = "Winner: " + winner;
    } else {
      newStatus = "Next player: " + (state.xIsNext ? "X" : "O");
    }
    setState({ ...state, status: newStatus, existAWinner: winner });
  }, [state.xIsNext]);

  async function handleClick(i) {
    // const history = state.history.slice(0, state.stepNumber + 1);
    // const current = history[state.stepNumber];
    const squares = current.squares.slice();

    if (state.existAWinner || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      ...state,
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  }

  function jumpTo(step) {
    setState({
      ...state,
      history: [...state.history],
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  const moves = state.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onclick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{state.status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
