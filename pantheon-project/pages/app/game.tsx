import { VStack, Heading, Text, Image, Button, Box, SimpleGrid, Center } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion'

const Game: NextPage = () => {

    const [userChoice, setMyChoice] = useState('scissors');
    const [computerChoice, setComputerChoice] = useState('scissors');
    const [clicked, setClick] = useState(0);
    const [userPoints, setUserPoints] = useState(0);
    const [computerPoints, setComputerPoints] = useState(0);
    const [turnResult, setTurnResult] = useState('make a move!');
    const [playerAverage, setAverage] = useState(0);
    const [winner, setWinner] = useState(false);

    const choices = ['rock', 'paper', 'scissors'];

    const MotionButton = motion(Button);
    const MotionImage = motion(Image);

    const handleOnClick = (choice: string) => {
        setMyChoice(choice);
        generateComputerChoice();
        setClick(clicked+1);
    }

    const generateComputerChoice = () => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(randomChoice);
    }

    const reset = () => {
        window.location.reload();
    }

    useEffect(() => {
        const comboMoves = userChoice + computerChoice;
        if(comboMoves === 'rockscissors' || comboMoves === 'paperrock' || comboMoves === 'scissorspaper'){
            const updatedUserPoints = userPoints + 1;
            setUserPoints(updatedUserPoints);
            setTurnResult('User point!');
            if(userPoints >= 4 && computerPoints < 5){
                setWinner(true);
             }
        }
        if(comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper'){
            const updatedComputerPoints = computerPoints + 1;
            setComputerPoints(updatedComputerPoints);
            setTurnResult('Machine point :(');
        }
        if(comboMoves === 'scissorsscissors' || comboMoves === 'rockrock' || comboMoves === 'paperpaper'){
            setTurnResult('Tie');
        }

        const updatedAverage = Math.floor((userPoints/(computerPoints + userPoints)) * 100);
        setAverage(updatedAverage);

    },[clicked]);

    useEffect(() =>{
        const updatedAverage = Math.floor((userPoints/(computerPoints + userPoints)) * 100);
        setAverage(updatedAverage);
    },[userPoints, computerPoints]);

  return (

    <VStack alignItems="center">

        <SimpleGrid columns={1} spacing = {10}>
            <Heading size='3xl' pt="5" pb='5' textShadow='4px 4px #FFA500' fontFamily={'mono'}>
                Rock Paper Scissors
            </Heading>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing = {10} spacingY='15px'>
            <Box height={'45'}>
                <Heading textAlign={'center'} size="lg">
                    User Points
                </Heading>
            </Box>
            <Box height={'45'}>
                <Heading textAlign={'center'} size="lg">
                    Computer Points
                </Heading>
            </Box>

            <Box height={'45'}>
                <Heading textAlign={'center'}>
                    {userPoints}
                </Heading>
            </Box>
            <Box height={'45'}>
                <Heading textAlign={'center'}>
                    {computerPoints}
                </Heading>
            </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} spacing = {10}>
            <Box w='300px'>
                <Heading pb='5'>
                    Win rate: {playerAverage}%
                </Heading>
            </Box>
        </SimpleGrid>

        <SimpleGrid  columns={2} spacing = {150}>
            <Text textAlign={'center'}>Your Choice</Text>
            <Text textAlign={'center'}>Computers Choice</Text>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing = {20}>
            <MotionImage boxSize='200px' src={`/${userChoice}.png`} fallbackSrc='https://via.placeholder.com/200' alt=''
                animate={{scale: [1, 1.5, 1.5, 1, 1], rotate: [0, 0, 270, 270, 0], borderRadius: ["50%", "50%", "50%", "50%", "50%"],}}>
            </MotionImage>
            
            <MotionImage boxSize='200px' src={`/${computerChoice}.png`} fallbackSrc='https://via.placeholder.com/200' alt=''
                animate={{scale: [1, 1.5, 1.5, 1, 1], rotate: [0, 0, 270, 270, 0], borderRadius: ["50%", "50%", "50%", "50%", "50%"],}}>
            </MotionImage>
        </SimpleGrid>

        <SimpleGrid columns={3} spacing = {20}>
            <Button size='lg' boxShadow='dark-lg' colorScheme={'orange'} onClick={() => handleOnClick('rock')}>Rock</Button>
            <Button size='lg' boxShadow='dark-lg' colorScheme={'green'} onClick={() => handleOnClick('paper')}>Paper</Button>
            <Button size='lg' boxShadow='dark-lg' colorScheme={'teal'} onClick={() => handleOnClick('scissors')}>Scissors</Button>
        </SimpleGrid>


        <Text>Turn Results: {turnResult}</Text>

        <MotionButton colorScheme='red' onClick={()=> reset()} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Reset the game
        </MotionButton>

        <MotionButton as="a" colorScheme="blue" href="/app/reasoning" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Next Page
        </MotionButton>
        
        { winner && 
            <MotionButton as="a" colorScheme='yellow' href="/app/winner"  bgGradient='linear(to-r, orange, yellow)' whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.1 }}>
                Golden Button!!!
            </MotionButton>

        }

    </VStack>
  )
}

export default Game;
