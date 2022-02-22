// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()

type Anime = {
    "anilist_id": number,
    "mal_id": number,
    "format": number,
    "status": number,
    "titles": {
        "en": string,
        "jp": string,
        "it": string
    },
    "descriptions": {
        "en": string,
        "it": string
    },
    "start_date": string,
    "end_date": string,
    "season_period": number,
    "season_year": number,
    "episodes_count": number,
    "episode_duration": number,
    "cover_image": string,
    "cover_color": string,
    "banner_image": string,
    "genres": Array<string>,
    "score": number,
    "id": number
}

type Data = {
    name: string
}

var anime = null

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


    const animeList = myJson.data.documents.slice(10)

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
            console.log(anime[0])
        }
        catch (error) {
            anime = []
        }
        res.send({ anime: JSON.stringify(anime) })
        return
    }
    res.status(200).json({ name: 'John Doe' })
}
