import { Box, Center, Flex, Link, Image, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from './Header'
import Anime from '../types/Anime'

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

const containerStyle = {
    margin: "10px auto",
    backgroundColor: "#FF8000",
} as const

interface AnimeContainerProps {
    anime: Anime,
    key: number
}

const AnimeContainer = ({ anime, key }: AnimeContainerProps) => {
    let path = `${anime.titles.en}`
    let regex = / /ig
    path = path?.replace(regex, '-')
    regex = /[^A-Za-z0-9\-]/ig;
    path = path?.replace(regex, '') + '-' + anime.id

    return (
        <Link href={`/anime/${path}`} width={{ base: "370px", sm: "370px", md: "370px", lg: "370px", xl: "370px" }} style={containerStyle} onClick={() => { window.localStorage.setItem('anime', JSON.stringify(anime)) }} key={key}>
            <VStack style={flexStyle}>
                <Box>
                    <Image src={anime.cover_image} alt={anime.titles.en} />
                </Box>
                <Box>
                    {anime.titles.en ? anime.titles.en : anime.titles.jp}
                </Box>
            </VStack>
        </Link>
    )

}

export default AnimeContainer