import { useState } from "react";
export default function Player({initialName , symbol , isActive , onChangeName}){
    const [isEditing , setIsEditing] = useState(false);
    const [playerName , setPlayerName] = useState(initialName);

    function handleEditClick(){
        setIsEditing((prev)=>!prev);

        if(isEditing){
            onChangeName(symbol , playerName);
        }
    }
    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let playerBox = <span className = "player-name" >{playerName}</span>;

    if(isEditing){
        playerBox = <input type="text" required value = {playerName} onChange={handleChange}></input>
    }

    return(
        <li className = {isActive ? 'active' : undefined}>
            <span className="player">
                {playerBox}
                <span className="player-symbol">{symbol}</span> 
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save':'Edit'}</button>
        </li>
    );
}