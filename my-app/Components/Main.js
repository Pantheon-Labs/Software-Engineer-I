import { Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

function Main({ character, selectedCard, page }) {
    const [activeCard, setActiveCard] = useState(character);

    useEffect(() => {
        let cid = 0;
        if (selectedCard <= 0) {
                setActiveCard(character[0]);
        } else {
            console.log("page =" + page + " selectedCard" + selectedCard);
            for (let n = 0; n <= 19; n++) {
                let num = ((page - 1) * 20) + n;
                if (character[n].id == selectedCard) {
                    console.log("They are equal")
                    cid = n;

                    console.log("cid before setting active card" + cid);
                    setActiveCard(character[cid]);
                    break;
                } else {
                    console.log("Something wrong " + num + " is not " + selectedCard);
                }
            }
        }
        console.log("Cid =" + cid)
    }, [character, selectedCard, page]);

    return (
        <div className='main'>
            <div className='mainContent'>
                {activeCard && (
                    <>
                        <div className='cardHighlight'>
                            <div className='cardContainer swingimage'>
                                <Image className='selectedCard' src={activeCard?.image} alt={activeCard?.name} />
                            </div>
                        </div>
                        <div className='info'>
                            <div className='cardDetails'>
                                <Text className='title' fontSize='2xl'>Name: {activeCard?.name}</Text>
                                <Text className='itemNumber'>#{activeCard?.id}</Text>
                            </div>
                            <div className='character'>
                                <div className='characterDetails'>

                                    <div className='cardNameAndHandle'>
                                        <Text className='characterAddress'>Birthplace: {activeCard["location"]?.name}</Text>
                                        <div className='characterHandle'></div>
                                    </div>
                                    <div className='characterLink'>

                                    </div>
                                    <div className='characterLink'>

                                    </div>
                                    <div className='characterLink'>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Main
