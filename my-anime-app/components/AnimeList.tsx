import { Box, Center, Flex, Link, Image, Grid, GridItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from './Header'
import Anime from '../types/Anime'
import AnimeContainer from './AnimeContainer'

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

interface AnimeListProps {
    animeJson: string
}

const AnimeList = ({ animeJson }: AnimeListProps) => {
    let key = 0
    let animeList: Array<Anime> = JSON.parse(animeJson)
    return (
        <Box style={outerStyle}>
            <Center>
                <Grid templateColumns='repeat(3, 1fr)' gap={6} style={flexStyle}>
                    {animeList?.map(
                        anime => {
                            return (
                                <GridItem>
                                    <AnimeContainer anime={anime} key={key} />
                                </GridItem>
                            )
                        }
                    )}
                </Grid>
            </Center>
        </Box>
    )
}

export default AnimeList