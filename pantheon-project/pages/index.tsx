import { VStack, Heading, Text, Button } from '@chakra-ui/react';
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (

    <VStack alignItems="center">
      <Heading size="4xl">
        Welcome to My App! 
      </Heading>
      <Text fontSize="4xl">
        This is the homepage.
      </Text>
      <Button as="a" colorScheme="blue" href="/app/game">
        Next Page!
      </Button>
    </VStack>
  )
}

export default Home;
