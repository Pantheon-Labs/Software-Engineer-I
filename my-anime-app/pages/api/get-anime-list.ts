// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Header from '../../components/Header'
require('dotenv').config()
import Anime from '../../types/Anime'


type Data = {
    name: string
}

var anime = []

async function getAnime(genre: string|null = null): Promise<Array<any>> {
    const query = genre ? `?genres=${genre}` : ''
    const response = await fetch(`https://api.aniapi.com/v1/anime${query}`, {
        method: 'GET',
        headers: {
            'Authorization': `${process.env.BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const myJson = await response.json()


    const animeList = myJson.data.documents.slice(0,9)

    return animeList
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | Data>
) {
    if (req.method == "GET") {
        try {
            if (req.headers.genre) {
                const genre = req.headers.genre.toString()
                anime = await getAnime(genre)
            }
            else{
                anime = await getAnime()
            }
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
