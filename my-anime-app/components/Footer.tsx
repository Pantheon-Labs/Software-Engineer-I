import Head from 'next/head'
import Image from 'next/image'
import { Box, Flex, Center } from '@chakra-ui/layout'
import TitleBar from './TitleBar'
import Menu from './Menu'
import { HStack, Link } from '@chakra-ui/react'

const stackStyle = {
    "backgroundColor": "#1A202C",
    "paddingLeft": "5%",
    "paddingRight": "5%",
} as const

const boxStyle = {
    "flex":"1",
    "color": "white"
} as const


export default function Footer() {
  return (
    <HStack minHeight={"10vw"} minWidth={"100vw"} spacing={"4"} style={stackStyle}>
        <Box style={boxStyle}>
            <Center>
            <Link href={`/`}>
                {"prev"}
            </Link>
            </Center>
            
        </Box>
        <Box style={boxStyle}>
            <Center>
            <Link href={`/`}>
                {"next"}
            </Link>
            </Center>
        </Box>
    </HStack>
  )
}