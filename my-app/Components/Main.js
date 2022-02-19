import { Image } from '@chakra-ui/react';
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
                            <div className='cardContainer'>
                                <Image className='selectedCard' src={activeCard?.image} alt={activeCard?.name} />
                            </div>
                        </div>
                        <div className='info'>
                            <div className='cardDetails'>
                                <div className='title'>{activeCard?.name}</div>
                                <span className='itemNumber'>#{activeCard?.id}</span>
                            </div>
                            <div className='character'>
                                <div className='characterDetails'>

                                    <div className='cardNameAndHandle'>
                                        <div className='characterAddress'>Birthplace: {activeCard["location"]?.name}</div>
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
