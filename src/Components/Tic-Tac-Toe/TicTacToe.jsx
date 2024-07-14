import React, { useState } from "react";
import "./TicTacToe.css";
import coffee_icon from "../Assets/coffee.png";
import chai_icon from "../Assets/chai.png";

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [message, setMessage] = useState("");

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Function to check for a winner
    const checkWin = (board) => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    // Function to handle game turn and win/tie conditions
    const toggle = (num) => {
        if (lock || board[num] !== "") {
            return;
        }

        const newBoard = [...board];
        if (count % 2 === 0) {
            newBoard[num] = coffee_icon;
        } else {
            newBoard[num] = chai_icon;
        }

        setBoard(newBoard);
        setCount(count + 1);

        const winner = checkWin(newBoard);
        if (winner) {
            setLock(true);
            setMessage(winner === coffee_icon ? "Coffee wins!" : "Chai wins!");
            announceWinner(winner);
        } else if (newBoard.every((cell) => cell !== "")) {
            setMessage("It's a tie!");
            announceTie();
        }
    };

    // Function to announce winner using text-to-speech
    const announceWinner = (winner) => {
        const speech = winner === coffee_icon ? "Coffee wins!" : "Chai wins!";
        announce(speech);
    };

    // Function to announce tie using text-to-speech
    const announceTie = () => {
        announce("It's a tie!");
    };

    // Function to announce message using text-to-speech
    const announce = (message) => {
        // Using speech synthesis API to announce the message
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    };

    // Function to reset the game
    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setCount(0);
        setLock(false);
        setMessage("");
    };

    // Function to render each box
    const renderBox = (index) => (
        <div className="boxes" onClick={() => toggle(index)}>
            {board[index] && <img src={board[index]} alt="icon" />}
        </div>
    );

    return (
        <div className="container">
            <h1 className="title">
                * Tic Tac Toe * <br />
                Chai or Coffee? Who Wins? <br />
            </h1>
            {message && <h2 className="message">{message}</h2>}
            <div className="board">
                <div className="row">
                    {renderBox(0)}
                    {renderBox(1)}
                    {renderBox(2)}
                </div>
                <div className="row">
                    {renderBox(3)}
                    {renderBox(4)}
                    {renderBox(5)}
                </div>
                <div className="row">
                    {renderBox(6)}
                    {renderBox(7)}
                    {renderBox(8)}
                </div>
            </div>
            <div className="buttons">
                <button className="btn" onClick={resetGame}>
                    <span></span>
                    <p data-start="good luck!" data-text="start!" data-title="new game"></p>
                </button>
            </div>
        </div>
    );
};

export default TicTacToe;
