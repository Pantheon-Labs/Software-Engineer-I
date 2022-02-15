import { CheckIcon } from '@chakra-ui/icons';
import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ISkill } from '../../types';

interface IProps {
  skill: ISkill;
}

const Card = ({ skill }: IProps) => (
  <HStack key={skill.title} align={'top'}>
    <Box color={'green.400'} px={2}>
      <Icon as={CheckIcon} />
    </Box>
    <VStack align={'start'}>
      <Text fontWeight={600}>
        {skill.title} - {skill.years} yrs
      </Text>
    </VStack>
  </HStack>
);

export default Card;
