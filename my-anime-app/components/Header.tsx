import { Box, Flex, Center } from '@chakra-ui/layout'
import TitleBar from './TitleBar'
import Menu from './Menu'
import Pagination from './Pagination'
import { Dispatch, SetStateAction } from 'react'

interface HeaderProps {
  setSearchValue: Dispatch<SetStateAction<string>>,
  page: number | null,
  setPage: Dispatch<SetStateAction<number>> | null
}

export default function Header({ setSearchValue, setPage = null, page = null }: HeaderProps) {
  const paginationProps = { page, setPage }
  return (
    <Box minWidth={"100vw"} display={"inline-block"}>
      <TitleBar setSearchValue={setSearchValue} />
      <Menu />
      {setPage != null && page != null ?
        <Pagination {...paginationProps} />
        : <></>

      }
    </Box>
  )
}