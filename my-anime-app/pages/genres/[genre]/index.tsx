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
import AnimeList from '../../../components/AnimeList'

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


const AnimGenre = () => {
    const router = useRouter()
    let { genre } = router.query
    genre = genre ? genre : ''
    const [animeJson, setAnime] = useState<any>(null)
    const [page, setPage] = useState<number>(1)
    const [searchValue, setSearchValue] = useState<string>("")
    const nextPage = animeJson ? JSON.parse(animeJson).length == 100 : false
    const headerProps = { setSearchValue, page, setPage, nextPage }
    useEffect(() => {
        const getAnime = async () => {
            const response = await fetch('/api/get-anime-list', { method: 'GET', headers: { genre: `${genre}`, title: searchValue } })
            const myJson = await response.json()
            setAnime(myJson.anime)
        }
        if (genre) {
            getAnime()
        }
    }, [genre])
    const anime = JSON.parse(animeJson)?.data
    return (
        <div>
            <Header {...headerProps} />
            <Center>
                <AnimeList animeJson={animeJson}></AnimeList>
            </Center>
            <Footer {...headerProps} />
        </div>
    )

}

export default AnimGenre