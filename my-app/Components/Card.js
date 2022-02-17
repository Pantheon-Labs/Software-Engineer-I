import { Image } from '@chakra-ui/react';

function Card({ character }) {
    console.log(character);
    return (
        <div name="characters">
            {character.map((name, id) => (
                <>
                    <div key={character[id].id}>{character[id].name}</div>
                    <Image src={character[id].image} alt={character[id].name}/>                    
                </>
                )
            )}
        </div>
    )
}

export default Card