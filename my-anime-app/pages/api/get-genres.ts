// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()

type Data = {
    name: string
}

var genres = {}

async function geetGenres(): Promise<Array<any>> {
    const response = await fetch(`https://api.aniapi.com/v1/resources/1.0/0`, {
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
            genres = await geetGenres()
            console.log(genres)
        }
        catch (error) {
            genres = {}
        }
        res.send({ genres: JSON.stringify(genres) })
        return
    }
    res.status(200).json({ name: 'John Doe' })
}
