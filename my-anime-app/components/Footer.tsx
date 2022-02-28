import Head from 'next/head'
import Image from 'next/image'
import { Box, Flex, Center } from '@chakra-ui/layout'
import TitleBar from './TitleBar'
import Menu from './Menu'
import { Button, HStack, Link } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

const stackStyle = {
    "backgroundColor": "#1A202C",
    "paddingLeft": "5%",
    "paddingRight": "5%",
} as const

const boxStyle = {
    "flex":"1",
    "color": "white"
} as const

interface FooterProps {
    page: number,
    setPage: Dispatch<SetStateAction<number>>
}

export default function Footer({page, setPage}: FooterProps) {
  return (
    <HStack minHeight={"10vw"} minWidth={"100vw"} spacing={"4"} style={stackStyle}>
        <Box style={boxStyle}>
            <Center>
            <Button onClick={() => {if (page > 1) {setPage(page-1)}}}>
                {"prev"}
            </Button>
            </Center>
        </Box>
        <Box style={boxStyle}>
            <Center>
            <Button onClick={() => setPage(page+1)}>
                {"next"}
            </Button>
            </Center>
        </Box>
    </HStack>
  )
}