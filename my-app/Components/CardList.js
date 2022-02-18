import React from 'react'
import Card from './Card'

function CardList({ character, setSelectedCard}) {
    return (
        <div className="cardList">
            {character.map((name, id, image) => (
                <div onClick={() => setSelectedCard(character[id].id)} key={id}>
                    <Card
                        id={character[id].id}
                        key={character[id].id}
                        name={character[id].name}
                        image={character[id].image}
                    />
                </div>
            ))}
        </div>

    )
}

export default CardList