import { Image } from '@chakra-ui/react';

function Card({ id, name, traits, image }) {
    return (
        <div className="card">
            <div key={id}>
                <Image src={image} alt={name} />
            </div>
        </div>
    )
}

export default Card