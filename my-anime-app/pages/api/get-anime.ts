// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()
import Anime from '../../types/Anime'


type Data = {
    name: string
}

var anime = {}

async function getAnime(id: string): Promise<Array<any>> {
    console.log(`id:${id}`)
    const response = await fetch(`https://api.aniapi.com/v1/anime/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `${process.env.BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const myJson = await response.json()

    return myJson
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | Data>
) {
    if (req.method == "GET") {

        try {
            let id = req.headers.id ? req.headers.id.toString() : null
            console.log(`id:${id}`)
            if (id != null) {
                anime = await getAnime(id)
            }
            console.log(anime)
        }
        catch (error) {
            anime = {}
        }
        res.send({ anime: JSON.stringify(anime) })
        return
    }
    res.status(200).json({ name: 'John Doe' })
}
