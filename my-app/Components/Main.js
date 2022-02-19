import { Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

function Main({ character, selectedCard, page }) {
    const [activeCard, setActiveCard] = useState(character);
    
    //console.log("page =" + page);
    useEffect(() => {
        let cid = 0;
        if (selectedCard <= 20) {
            cid = selectedCard - 1;
            setActiveCard(character[cid]);
        } else {
            //for (let currentPage = 1; currentPage < page; currentPage++) {
                console.log("page =" + page + " selectedCard" + selectedCard);
                for (let n = 0; n <= 19; n++) {
                    let num = ((page-1) * 20)+n;
                    if ((num+1) == selectedCard) {
                        console.log("They are equal")
                        cid = n;
                        /*if(cid<0){
                            console.log("cid <0"+cid+" num="+num);
                            cid=(currentPage*19)+Math.abs(num)+i;
                            setActiveCard(character[cid]);
                        }else if(cid>19){
                            cid = cid-19;
                            setActiveCard(character[cid]);
                        }*/
                        console.log("cid before setting active card"+cid);
                        setActiveCard(character[cid]);
                        break;
                    } else {
                        console.log("Something wrong "+num+" is not "+selectedCard);
                    }
                    //break;
                }
                /*if(num==selectedCard) {
                    break;
                }
            }*/
        }
        console.log("Cid =" + cid)
    }, [character, selectedCard, page]);

    return (
        <div className='main'>
            <div className='mainContent'>
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
                </div>
            </div>
        </div>
    )
}

export default Main
