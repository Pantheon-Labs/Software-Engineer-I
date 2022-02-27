import Head from 'next/head'
import Image from 'next/image'
import { Box, Flex, Center } from '@chakra-ui/layout'
import TitleBar from './TitleBar'
import Menu from './Menu'



export default function Header() {
  return (
    <Box minWidth={"100vw"} display={"inline-block"}>
      <TitleBar />
      <Menu />
    </Box>
  )
}