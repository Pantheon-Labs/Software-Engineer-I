import { VStack, Heading, Text, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion'


const Winner: NextPage = () => {

  const MotionHeading = motion(Heading);
  const MotionButton = motion(Button);

  return (

    <>
    <Confetti width={2560} height={1440} />
      <VStack textAlign={'center'}>

        <MotionHeading py='100' fontFamily={'mono'} textShadow='4px 4px #FFA500' drag dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50,}}>
          Winner winner chicken dinner
        </MotionHeading>

        <MotionButton as="a" colorScheme='yellow' href="/app/reasoning" whileHover={{ scale: 1.3 }}whileTap={{ scale: 0.1 }}>
          Continue
        </MotionButton>


        <Text>PS: click and drage the text above!</Text>
      </VStack>
    </>
  )
}

export default Winner;
