import { Image } from '@chakra-ui/react';

function Card({ id, name, traits, image }) {
    return (
        <div name="characters">
            <div key={id} className='card'>{name}</div>
            <Image src={image} alt={name} />
        </div>
    )
}

export default Card