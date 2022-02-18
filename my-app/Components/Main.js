import { Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

function Main({ character, selectedCard, page }) {
    const [activeCard, setActiveCard] = useState(character);
    let cid = 0;
    console.log("page =" + page);
    useEffect(() => {
        if (selectedCard < 19) {
            cid = selectedCard - 1;
        } else {
            for (let i = 0; i < page; i++) {
                console.log("page =" + page + " selectedCard" + selectedCard);
                for (let n = 0; n <= 19; n++) {
                    let num = (i * 19) + n;
                    if (num == selectedCard) {
                        cid = n-(i)-1;
                        setActiveCard(character[cid]);
                        break;
                    } else if (cid > selectedCard) {
                        break;
                    }
                }
                if(num==selectedCard) {
                    break;
                }
            }
        }
        //cid = selectedCard-(page*19);
        console.log("Cid =" + cid)


        //setActiveCard(character[cid])

    }, [character, selectedCard]);

    return (
        <div className='main'>
            <div className='mainContent'>
                <div className='cardHighlight'>
                    <div className='cardContainer'>
                        <Image className='selectedCard' src={activeCard?.image} alt={activeCard?.name} />
                    </div>
                </div>
                <div className='info'>
                    <div className='cardDetails' style={{ color: '#FFF' }}>
                        <div className='title'>{activeCard?.name}</div>
                        <span className='itemNumber'>#{activeCard?.id}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
