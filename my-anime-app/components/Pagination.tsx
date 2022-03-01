import { Box, Flex, Center } from '@chakra-ui/layout'
import { Button, HStack, Link } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

const stackStyle = {
    "backgroundColor": "#1A202C",
    "paddingLeft": "5%",
    "paddingRight": "5%",
} as const

const boxStyle = {
    "flex": "1",
    "color": "white"
} as const

interface PaginationProps {
    page: number | null,
    setPage: Dispatch<SetStateAction<number>> | null
}

export default function Pagination({ page, setPage }: PaginationProps) {
    return (
        <>
            {page != null && setPage != null ? (
                <HStack minWidth={"100vw"} spacing={"4"} style={stackStyle}>
                    <Box style={boxStyle}>
                        <Center>
                            {page > 1 ?
                                <Button onClick={() => { if (page > 1) { setPage(page - 1) } }}>
                                    {"prev"}
                                </Button> :
                                <></>
                            }
                        </Center>
                    </Box>
                    <Box style={boxStyle}>
                        <Center>
                            {page}
                        </Center>
                    </Box>
                    <Box style={boxStyle}>
                        <Center>
                            <Button onClick={() => setPage(page + 1)}>
                                {"next"}
                            </Button>
                        </Center>
                    </Box>
                </HStack>) :
                <></>
            }
        </>
    )
}