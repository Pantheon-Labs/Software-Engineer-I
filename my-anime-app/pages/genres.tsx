import { Box, Center, Flex, Link, Image, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'

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


const Genres = () => {
    const [genresJson, setgenres] = useState<any>(null)
    useEffect(() => {
        const getGenres = async () => {
            const response = await fetch('/api/get-genres', { method: 'GET', headers: {} })
            const myJson = await response.json()
            setgenres(myJson.genres)
        }
        getGenres()
    }, [])
    const genres = JSON.parse(genresJson)?.data?.genres
    return (
        <div>
            <Header />
            <Center>
                <VStack>
                    {
                        genres?.map((genre: string) => {
                            return (
                                <Box>
                                    <Link href={`/genres/${genre}`}>{genre}</Link>
                                </Box>
                            )
                        })
                    }
                </VStack>
            </Center>
            <Footer />
        </div>
    )

}

export default Genres