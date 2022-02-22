import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import AnimeList from '../components/AnimeList'

const Home: NextPage = () => {
  const [animeJson, setAnime] = useState<any>(null)
  useEffect(() => {
    const getAnime= async () => {
      const response = await fetch('/api/get-anime-list', { method: 'GET', headers: {} })
      const myJson = await response.json()
      setAnime(myJson.anime)
    }
    getAnime()
  }, [])
  return (
    <div className={styles.container}>
      <AnimeList animeJson={animeJson}></AnimeList>
    </div>
  )
}

export default Home
