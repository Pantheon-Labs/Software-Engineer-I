// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()
import Anime from '../../types/Anime'


type Data = {
    name: string
}

var anime = []

async function getAnime(): Promise<Array<any>> {
    const response = await fetch('https://api.aniapi.com/v1/anime', {
        method: 'GET',
        headers: {
            'Authorization': `${process.env.BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const myJson = await response.json()


    const animeList = myJson.data.documents.slice(0,10)

    return animeList
}

function getAnimeList(): Promise<Array<any>> {
    let animeList: Array<any> = new Array()
    return new Promise((resolve, reject) => {
        getAnime()
    })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | Data>
) {
    if (req.method == "GET") {
        
        try {
            anime = await getAnime()
            console.log(anime.length)
        }
        catch (error) {
            anime = []
        }
        res.send({ anime: JSON.stringify(anime) })
        return
    }
    res.status(200).json({ name: 'John Doe' })
}
