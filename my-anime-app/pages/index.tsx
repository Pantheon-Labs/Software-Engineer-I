import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [animeJson, setAnime] = useState<any>(null)
  useEffect(() => {
    const getAnime= async () => {
      debugger
      const response = await fetch('/api/get-anime-list', { method: 'GET', headers: {} })
      const myJson = await response.json()
      setAnime(myJson.anime)
    }
    getAnime()
  }, [])
  return (
    <div className={styles.container}>
      {animeJson}
    </div>
  )
}

export default Home
