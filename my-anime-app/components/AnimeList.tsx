import { Box, Center, Flex, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from './Header'
import Anime from '../types/Anime'

const outerStyle = {
    backgroundColor: "white",
    minWidth: "100vw",
    minHeight: "100vh"
} as const

const flexStyle = {
    flexDirection: "column",
} as const

const boxStyle = {
    textAlign: "center"
} as const

interface AnimeListProps {
    animeJson: string
}

const AnimeList = ({animeJson}: AnimeListProps) => {
    let key = 0
    debugger
    let animeList: Array<Anime> = JSON.parse(animeJson)
    return (
        <Box style={outerStyle}>
            <Header />
            <Center>
                <Flex style={flexStyle}>
                    {animeList?.map(
                        anime => {
                            return (
                                <Link href={`/`} key={key++} style={boxStyle}>
                                    {anime.titles.en}
                                </Link>
                            )
                        }
                    )}
                </Flex>
            </Center>
        </Box>
    )
}

export default AnimeList