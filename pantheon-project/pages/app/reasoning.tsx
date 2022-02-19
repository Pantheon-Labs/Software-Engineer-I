import { VStack, Heading, Text, Box } from '@chakra-ui/react';
import { NextPage } from 'next'

const Reasoning: NextPage = () => {
  return (

    <VStack>

      <Box bg='brown' w='70%' px={'3'} py={'8'}>
        <Heading alignItems={'center'} size="4xl" color='white'>
          Why do I want to join your team?
        </Heading>
      </Box>

      <Box bg='gray.500' w='70%'  px={'3'} py={'3'}>
        <Heading color='white' fontSize="4xl">
          Reason 1: 
        </Heading>
          <Text color='white' fontWeight={'bold'}>
          For my senior project at The University of Texas at Dallas, I was introduced to this 
          specific tech stack and grew to love it and it quickly became my favorite to work with.
          </Text>
      </Box>

      <Box bg='blue' w='70%'  px={'3'} py={'3'}>
        <Heading color='white' fontSize="4xl">
          Reason 2: 
        </Heading>
          <Text color='white' fontWeight={'bold'}>
          Joining this team seems like a great way for me to expand my skills and knowledge at a fast pace.  
          For every developer there is always something new to learn, as a junior developer there are far more unknowns to explore everyday.
          </Text>
      </Box>

      <Box bg='gray.500' w='70%'  px={'3'} py={'3'}>
        <Heading color='white' fontSize="4xl">
          Reason 3: 
        </Heading>
          <Text color='white' fontWeight={'bold'}>
          I am drawn to your business model of helping companies expand their vision through technology. 
          My goal is to work with a group of like minded individuals where we can help add value to as many customers as possible.
          </Text>
      </Box>

    </VStack>
  )
}

export default Reasoning;
