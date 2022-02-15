import type { NextPage } from 'next';
import {
  Container,
  Heading,
  Text,
  Stack,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import Card from '../components/Card';
import StatsCard from '../components/Card/Stats';
import { useEffect, useState } from 'react';
import { ISkill } from '../types';

const Home: NextPage = () => {
  const [skills, setSkills] = useState<ISkill[] | undefined>();

  useEffect(() => {
    async function init() {
      try {
        const { data } = await axios.get(
          'http://localhost:3001/api/v1/skills/'
        );
        setSkills(data.data.skills);
      } catch (error) {
        console.log(error);
      }
    }
    init();
  }, []);

  return (
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
          application. I have never use Chakra before so this was a first for
          me. I hope to speak to you soon!
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
            {skills &&
              skills.map((skill) => <Card key={skill.title} skill={skill} />)}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
