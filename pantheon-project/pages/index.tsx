import { VStack, Heading, Text, Button } from '@chakra-ui/react';
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (

    <VStack alignItems="center">
      <Heading size="4xl" pt='23'>
        Welcome to My App! 
      </Heading>
      <Text fontSize="3xl" w='80%' pt='50' textAlign={'center'}>
        I created a little game to help refresh my React skills, and get better with formatting using Chakra-ui!
      </Text>
      <Text fontSize="2xl">In order to move onto the next page, please click the button below!</Text>
      <Button as="a" colorScheme="blue" href="/app/game">
        Go to Game
      </Button>
    </VStack>
  )
}

export default Home;
