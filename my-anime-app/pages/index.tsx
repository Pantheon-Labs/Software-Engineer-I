import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AnimeList from '../components/AnimeList'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home: NextPage = () => {
  const [animeJson, setAnime] = useState<any>(null)
  const [page, setPage] = useState<number>(1)
  debugger
  useEffect(() => {
    const getAnime = async () => {
      const response = await fetch('/api/get-anime-list', { method: 'GET', headers: {page: page.toString()} })
      const myJson = await response.json()
      setAnime(myJson.anime)
    }
    getAnime()
  }, [page])
  return (
    <div>
      <Header />
      <AnimeList animeJson={animeJson}></AnimeList>
      <Footer page={page} setPage={setPage}/>
    </div>
  )
}

export default Home
