import { VStack, Heading, Text, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import Confetti from 'react-confetti';

const Home: NextPage = () => {

  return (

    <><Confetti
          width={2560}
          height={1440} />
          <VStack textAlign={'center'}>
          <Heading py='100'>
              Winner Winner Chicken Dinner!!
          </Heading>
          <Button as="a" colorScheme='yellow' href="/app/reasoning">Continue</Button>
          </VStack></>
        )
}

export default Home;
