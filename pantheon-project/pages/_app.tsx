import '../styles/globals.css';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

const theme = extendTheme({ config });

function MyApp({ Component, pageProps, router }) {
  return (
    <motion.div key={router.route} initial='pageInitial' animate='pageAnimate' variants={{
      pageInitial: {
        opacity: 0
      },
      pageAnimate: {
        opacity: 1
      },
    }}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </motion.div>
  )
}

export default MyApp
