import { Center, Flex, Spacer, VStack } from '@chakra-ui/react';
import NoteCard from './NoteCard';
import { Text } from '@chakra-ui/react';

const NoteCardContainer = ({ notes, selectNote }) => {
	return (
		<>
			<Flex>
				<VStack>
					<Text color="black" fontSize="3xl">
						Notes
					</Text>
					{notes.data.map((note) => {
						return (
							<NoteCard
								selectNote={selectNote}
								key={note.id}
								note={note}
							/>
						);
					})}

					{/* <Text>{notes.numberOfHits}</Text> */}
				</VStack>
			</Flex>
		</>
	);
};

export default NoteCardContainer;
