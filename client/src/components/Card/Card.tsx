import { CheckIcon } from '@chakra-ui/icons';
import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  skill: {
    id: number;
    title: string;
    text: string;
  };
}

const Card = ({ skill }: IProps) => (
  <HStack key={skill.id} align={'top'}>
    <Box color={'green.400'} px={2}>
      <Icon as={CheckIcon} />
    </Box>
    <VStack align={'start'}>
      <Text fontWeight={600}>{skill.title}</Text>
      <Text color={'gray.600'}>{skill.text}</Text>
    </VStack>
  </HStack>
);

export default Card;
