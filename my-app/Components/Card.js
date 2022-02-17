import React from 'react'

function Card({ character }) {
    console.log(character);
    return (
        <div name="characters">
            {character.map((id) => (
                <div key={character[id]}>{character[id].name}</div>
                )
            )}</div>
    )
}

export default Card