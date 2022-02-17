import {
	Box,
	Center,
	Divider,
	Flex,
	StackDivider,
	VStack,
} from '@chakra-ui/react';
import NoteCard from './NoteCard';
import { Text } from '@chakra-ui/react';

const NoteCardContainer = ({ notes, selectNote, selectedNote }) => {
	return (
		<>
			<Flex>
				<VStack spacing={null}>
					<Box w="50vh" h="10vh" bg="theme.primary">
						<Center w="100%" h="100%">
							<Text
								as="em"
								color="black"
								fontWeight="600"
								fontSize="3xl"
							>
								Sam's Notes
							</Text>
						</Center>
					</Box>
					<Divider />
					{notes.data.map((note) => {
						return (
							<>
								<NoteCard
									selectedNote={selectedNote}
									selectNote={selectNote}
									key={note.id}
									note={note}
								/>
							</>
						);
					})}

					{/* <Text>{notes.numberOfHits}</Text> */}
				</VStack>
			</Flex>
		</>
	);
};

export default NoteCardContainer;
