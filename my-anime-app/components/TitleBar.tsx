import Head from 'next/head'
import Image from 'next/image'
import { Box, Stack, VStack, HStack, Flex, Grid } from '@chakra-ui/layout'
import { Center, Input, Text, Spacer, Button } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from 'react'

const titleBarStyle = {
    "color": "white",
    "fontSize": "2.5em",
    margin: "0em 1em",
} as const

const gridStyle = {
    margin: 0,
    padding: "0em 1em",
    backgroundColor: "#1A202C",
} as const

const searchBarStyle = {
    margin: "1em 1em",
    "backgroundColor": "white",
    width: "40vw"
} as const

interface TitleBarProps {
    setSearchValue: Dispatch<SetStateAction<string>> | null
}

export default function TitleBar({setSearchValue = null}: TitleBarProps) {
    return (
        <Stack direction={["column", "row"]} spacing="10vw" style={gridStyle} >
            <Box style={titleBarStyle}>
                <Text>
                    Anime
                </Text>
            </Box>
            <Box>
                <Input style={searchBarStyle} onChange={(e) => setSearchValue ? setSearchValue(e.target.value) : console.log()} placeholder="Search" />
                <Button>Search</Button>
            </Box>
        </Stack>
    )
}

