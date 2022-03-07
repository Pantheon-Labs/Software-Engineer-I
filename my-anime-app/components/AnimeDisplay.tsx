import { Box, Center, Flex, Link, Image, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from './Header'
import Anime from '../types/Anime'
import { SagasCollapse, GenresCollapse } from './Collapsables'

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

interface AnimDisplayProps {
    anime: Anime,
}


const AnimDisplay = ({ anime }: AnimDisplayProps) => {
    return (
        <VStack style={flexStyle}>
            <Box>{anime?.titles?.en}</Box>
            <Box>
                <Image src={anime?.cover_image} alt={anime?.titles?.en} />
            </Box>
            <Box>{anime?.season_year}</Box>
            <Box dangerouslySetInnerHTML={{ __html: anime?.descriptions?.en.toString() }}>
            </Box>
            <Box>{`episode count: ${anime?.episodes_count}`}</Box>
            {anime?.sagas ? <SagasCollapse sagas={anime?.sagas} /> : null}
            <GenresCollapse genres={anime?.genres} />
        </VStack>
    )

}

export default AnimDisplay