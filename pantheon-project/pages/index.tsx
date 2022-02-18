import { VStack, Heading, Text } from '@chakra-ui/react';
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
    </VStack>
  )
}

export default Home;
