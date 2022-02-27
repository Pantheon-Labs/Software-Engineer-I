import { Box, Center, Flex, Link, Image } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Header from '../../components/Header'
import Anime from '../../../types/Anime'
import AnimeDisplay from '../../../components/AnimeDisplay'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const outerStyle = {
    backgroundColor: "white",
    minWidth: "100vw",
    minHeight: "100vh"
} as const

const flexStyle = {
    flexWrap: "wrap",
    justiyContent: "center",
    alignItems: "center",
    margin: "3%",
    maxWidth: "100%",
} as const

const boxStyle = {
    textAlign: "center"
} as const


const AnimTitle = () => {
    const router = useRouter()
    const { title } = router.query
    const id = title ? title.slice(title?.lastIndexOf('-') + 1) : ''
    const [animeJson, setAnime] = useState<any>(null)
    useEffect(() => {
        const getAnime = async () => {
            const response = await fetch('/api/get-anime', { method: 'GET', headers: { id: id.toString() } })
            const myJson = await response.json()
            setAnime(myJson.anime)
        }
        if (id) {
            getAnime()
        }
    }, [id])
    const anime = JSON.parse(animeJson)?.data
    return (
        <div>
            <Header />
            <Center>
                <AnimeDisplay anime={anime} />
            </Center>
            <Footer />
        </div>
    )

}

export default AnimTitle