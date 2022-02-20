import { VStack, Heading, Text, Button } from '@chakra-ui/react';
import { NextPage } from 'next'
import { motion } from 'framer-motion'

const Home: NextPage = () => {

  const MotionButton = motion(Button);

  return (

    <VStack alignItems="center" py='10'>

      <Heading size="4xl" textShadow='4px 4px #FFA500' pt='23' fontFamily={'mono'}>
        Welcome to My App! 
      </Heading>

      <Text as='u' fontSize="3xl" w='80%' pt='50' textAlign={'center'} fontFamily={'mono'} >
        Prepare to battle!
      </Text>

      <VStack py='75'>
        <MotionButton as="a" size='lg' colorScheme="blue" href="/app/game" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
          Click me!
        </MotionButton>
      </VStack>

    </VStack>
    
  )
}

export default Home;
