import { Box, Center, Grid, GridItem } from '@chakra-ui/react'
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
    debugger
    return (
        <Box style={outerStyle}>
            <Center>
                <Grid templateColumns='repeat(4, 1fr)' gap={6} style={flexStyle}>
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