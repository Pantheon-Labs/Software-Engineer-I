import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Flex, Grid } from '@chakra-ui/layout'
import { Center, Input, Spacer } from "@chakra-ui/react"
import TitleBar from './TitleBar'

const menuItemStyle = {
    "flex": 1,
    "color": "#1A202C",
    "fontSize": "1.5em"
} as const

const gridStyle = {
    "backgroundColor": "#ff8080",
    "paddingLeft": "5%",
    "paddingRight": "5%",
} as const

const searchBarStyle = {
    "marginTop": "1em",
    "marginBottom": "1em",
    "backgroundColor": "white",
} as const

export default function Menu() {
    return (
        <Grid style={gridStyle} templateColumns="repeat(2, 1fr)" gap={6}>
            <Box style={menuItemStyle}> <Link href="/">home</Link> </Box>
            <Box style={menuItemStyle}> <Link href="/genres">genres</Link> </Box>
        </Grid>
    )
}
