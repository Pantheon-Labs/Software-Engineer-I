import { VStack, Heading, Text, Button, Image } from '@chakra-ui/react';
import { NextPage } from 'next';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion'


const Winner: NextPage = () => {

  const MotionHeading = motion(Heading);
  const MotionButton = motion(Button);

  return (

    <>
    <Confetti width={2560} height={1000} />
      <VStack textAlign={'center'}>

        <MotionHeading py='100' fontFamily={'mono'} textShadow='4px 4px #FFA500' drag dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50,}}>
          Winner Winner Chicken Dinner
        </MotionHeading>

        <Text>PS: click and drag the text above!</Text>

        <MotionButton as="a" colorScheme='yellow' href="/app/reasoning" whileHover={{ scale: 1.3 }}whileTap={{ scale: 0.1 }}>
          Continue
        </MotionButton>

        <VStack py='50'>
          <Text>
            Congrats! You beat the computer!!
          </Text>
          <Image boxSize='250px' src={'/computer.gif'} fallbackSrc='https://via.placeholder.com/200' alt=''></Image>
        </VStack>
      </VStack>
    </>
  )
}

export default Winner;
