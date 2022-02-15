import type { NextPage } from 'next';
import {
  Container,
  Heading,
  Text,
  Stack,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';

import Card from '../components/Card';
import StatsCard from '../components/Card/Stats';

// Replace test data with your own
const skills = Array.apply(null, Array(8)).map((x, i) => ({
  id: i,
  title: 'Lorem ipsum dolor sit amet',
  text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
}));

const Home: NextPage = () => (
  <Box
    p={4}
    w="100%"
    h="100%"
    minH="100vh"
    bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
  >
    <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
      <Heading fontSize={'3xl'}>Why you should pick me! 😁</Heading>
      <Text color={'gray.600'} fontSize={'xl'}>
        I gave myself a max time limit of 3 hours to complete this little
        application. I have never use Chakra before so this was a first for me.
        I hope to speak to you soon!
      </Text>
    </Stack>
    <Container maxW={'full'} mt={10}>
      <Stack spacing={4} as={Container} maxW={'full'} textAlign={'center'}>
        <Heading fontSize={'2xl'}>How the app was made</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'🚀 Powered by'} stat={'Next.js'} />
          <StatsCard title={'🎨 Designed with'} stat={'Chakra UI'} />
          <StatsCard title={'🧠 Data from'} stat={'Node.js'} />
        </SimpleGrid>
      </Stack>
    </Container>
    <Container maxW={'full'} mt={10}>
      <Stack spacing={4} as={Container} maxW={'full'} textAlign={'center'}>
        <Heading fontSize={'2xl'}>My skills</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {skills.map((feature) => (
            <Card key={feature.id} skill={feature} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  </Box>
);

export default Home;
