import { VStack, Heading, Text, Image, HStack, Button, Box } from '@chakra-ui/react';
import { NextPage } from 'next'
import React, {useState, useEffect} from 'react';

const Game: NextPage = () => {

    const [userChoice, setMyChoice] = useState('rock');
    const [computerChoice, setComputerChoice] = useState('rock');
    const [clicked, setClick] = useState(0);
    const [userPoints, setUserPoints] = useState(0);
    const [machinePoints, setMachinePoints] = useState(0);
    const [turnResult, setTurnResult] = useState('make a move!');
    const [playerAverage, setAverage] = useState(0);

    const choices = ['rock', 'paper', 'scissors'];

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
        }
        if(comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper'){
            const updatedComputerPoints = machinePoints + 1;
            setMachinePoints(updatedComputerPoints);
            setTurnResult('Machine point :(');
        }
        if(comboMoves === 'scissorsscissors' || comboMoves === 'rockrock' || comboMoves === 'paperpaper'){
            setTurnResult('Tie');
        }

        const updatedAverage = Math.floor((userPoints/(machinePoints + userPoints)) * 100);
        setAverage(updatedAverage);

    },[clicked]);

    useEffect(() =>{
        const updatedAverage = Math.floor((userPoints/(machinePoints + userPoints)) * 100);
        setAverage(updatedAverage);
    },[userPoints, machinePoints])

  return (

    <VStack alignItems="center">
        <Heading size='3xl' pt="5" pb='5'>
            Rock Paper Scissors
        </Heading>

        <HStack pt='2' spacing='45'>
            <Box w='220px' h='50px'>
                <Heading size="lg">
                    User Points
                </Heading>
            </Box>
            <Box w='250px' h='50px'>
                <Heading size="lg">
                    Computer Points
                </Heading>
            </Box>
        </HStack>

        <HStack>
            <Box w='290px' h='50px'>
                <Heading pr='11'>
                    {userPoints}
                </Heading>
            </Box>
            <Box w='100px' h='50px'>
                <Heading>
                    {machinePoints}
                </Heading>
            </Box>
        </HStack>

        <Heading pb='5'>
            <Box w='300px'>
                Win rate: {playerAverage}%
            </Box>
        </Heading>

        <HStack>
            <Image boxSize='200px' src={`/${userChoice}.png`} alt=''></Image>
            <Image boxSize='200px' src={`/${computerChoice}.png`} alt=''></Image>
        </HStack>

        <HStack>
            <Button onClick={() => handleOnClick('rock')}>Rock</Button>
            <Button colorScheme={'green'} onClick={() => handleOnClick('paper')}>Paper</Button>
            <Button onClick={() => handleOnClick('scissors')}>Scissors</Button>
        </HStack>


        <Text>Turn Results: {turnResult}</Text>

        <Button onClick={()=> reset()}>Reset the game</Button>

      </VStack>
  )
}

export default Game;
