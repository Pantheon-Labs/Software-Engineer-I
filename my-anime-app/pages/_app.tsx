import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component minWidth="100vw" {...pageProps} />
}

export default MyApp
