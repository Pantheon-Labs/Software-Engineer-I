// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { title } from 'process'
import Header from '../../components/Header'
require('dotenv').config()
import Anime from '../../types/Anime'


type Data = {
    name: string
}

var anime = []

async function getAnime(genre: string|null = null, title: string|null = null, page: string|null = null): Promise<Array<any>> {
    let query = genre ? `genres=${genre}&` : ''
    query += title ? `title=${title}&` : ''
    query += page ? `page=${page}` : ''
    console.log(`REQUEST: https://api.aniapi.com/v1/anime?${query}`)
    const response = await fetch(`https://api.aniapi.com/v1/anime?${query}`, {
        method: 'GET',
        headers: {
            'Authorization': `${process.env.BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const myJson = await response.json()

    const animeList = myJson.data.documents

    return animeList
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | Data>
) {
    if (req.method == "GET") {
        try {
            const page = req.headers.page ? req.headers.page.toString() : "1"
            const genre =  req.headers.genre ? req.headers.genre.toString() : null
            const title = req.headers.title ? req.headers.title.toString() : null
            anime = await getAnime(genre, title, page)
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
