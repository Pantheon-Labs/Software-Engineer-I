import React from 'react'
import Card from './Card'

function CardList({ character }) {
    return (
        <div className="cardList">
            {character.map((name, id, image) => (
                <Card
                    id={character[id].id}
                    key={character[id].id}
                    name={character[id].name}
                    image={character[id].image}
                />
            ))}
        </div>

    )
}

export default CardList