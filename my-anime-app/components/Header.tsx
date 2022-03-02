import { Box, Divider } from '@chakra-ui/layout'
import TitleBar from './TitleBar'
import Menu from './Menu'
import Pagination from './Pagination'
import { Dispatch, SetStateAction } from 'react'
import { VStack } from '@chakra-ui/react'

interface HeaderProps {
  setSearchValue: Dispatch<SetStateAction<string>>,
  page: number | null,
  setPage: Dispatch<SetStateAction<number>> | null,
  nextPage: boolean | null
}

const vstackStyle = {
  minWidth: "100vw",
  display: "inline-block",
  backgroundColor: "#1A202C",
  spacing: "2vw"
} as const

export default function Header({ setSearchValue, setPage = null, page = null, nextPage = true }: HeaderProps) {
  const paginationProps = { page, setPage, nextPage }
  return (
    <VStack style={vstackStyle}>
      <Box>
        <TitleBar setSearchValue={setSearchValue} />
      </Box>
      <Box>
        <Menu />
      </Box>
      {setPage != null && page != null ?
        <Box>
          <Pagination {...paginationProps} />
        </Box>
        : <></>
      }
    </VStack>
  )
}