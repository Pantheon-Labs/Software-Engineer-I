import Head from 'next/head'
import Image from 'next/image'
import { Box, Flex, Center } from '@chakra-ui/layout'
import TitleBar from './TitleBar'
import Menu from './Menu'
import { Button, HStack, Link } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import Pagination from './Pagination'

const boxStyle = {
    "backgroundColor": "#1A202C",
    "paddingLeft": "5%",
    "paddingRight": "5%",
} as const
interface FooterProps {
    page: number|null,
    setPage: Dispatch<SetStateAction<number>>|null
}

export default function Footer({ page=null, setPage=null }: FooterProps) {
    const props = { page, setPage }
    return (
        <Box minHeight={"10vw"} style={boxStyle}>
            <Pagination {...props} />
        </Box>
    )
}