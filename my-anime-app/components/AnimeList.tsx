import { Box, Center, Flex, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from './Header'

const outerStyle = {
    backgroundColor: "#FF8000",
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
    animeList: Array<any>
}

const AnimeList = ({animeList}: AnimeListProps) => {
    let key = 0
    return (
        <Box style={outerStyle}>
            <Header />
            <Center>
                <Flex style={flexStyle}>
                    {animeList.map(
                        anime => {
                            return (
                                <Link href={`/`} key={key++} style={boxStyle}>
                                    {}
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