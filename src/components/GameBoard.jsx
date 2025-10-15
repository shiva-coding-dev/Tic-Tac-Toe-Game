import { act, useState } from "react";
const initialGameboard = [
    [null, null, null], 
    [null, null ,null], 
    [null, null ,null]
];
export default function GameBoard({onSelectSquare , turns}){
    let gameBoard = initialGameboard;

    for(const turn of turns ){
        const {square, player} = turn;
        const {row , col} = square;

        gameBoard[row][col] = player;
    }

    // const [gameBoard , setGameBoard] =  useState(initialGameboard);
    // function handleSelectSquare(rowIdx , colIdx ){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedBoard = [...prevGameBoard.map(initialArray => [...initialArray])];
    //         updatedBoard[rowIdx][colIdx] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectSquare();
    // }

    return(
        <ol id = "game-board">
            {gameBoard.map((row , rowIndex)=>(
                <li key = {rowIndex} >
                    <ol>
                        {row.map((playerSymbol , colIndex)=>(
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex , colIndex)} 
                                    disabled = {playerSymbol !== null}
                                >{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}