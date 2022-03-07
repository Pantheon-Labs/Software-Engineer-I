import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AnimeList from '../components/AnimeList'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home: NextPage = () => {
  const [animeJson, setAnime] = useState<any>(null)
  const [page, setPage] = useState<number>(1)
  const [searchValue, setSearchValue] = useState<string>("")
  const nextPage = animeJson ? JSON.parse(animeJson).length == 100 : false
  const headerProps = {setSearchValue, page, setPage, nextPage}
  useEffect(() => {
    const getAnime = async () => {
      const response = await fetch('/api/get-anime-list', { method: 'GET', headers: {page: page.toString(), title: searchValue} })
      const myJson = await response.json()
      setAnime(myJson.anime)
    }
    getAnime()
  }, [page, searchValue])
  return (
    <div>
      <Header {...headerProps}/>
      <AnimeList animeJson={animeJson}></AnimeList>
      <Footer page={page} setPage={setPage}/>
    </div>
  )
}

export default Home
