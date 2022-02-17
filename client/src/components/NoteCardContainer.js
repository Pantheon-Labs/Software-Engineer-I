import { Center, Flex, VStack } from '@chakra-ui/react';
import NoteCard from './NoteCard';

const NoteCardContainer = ({ notes }) => {
	return (
		<>
			<Flex>
				<VStack>
					<h1>Number of notes: {notes.numberOfHits}</h1>
					{notes.data.map((note) => {
						return <NoteCard key={note.id} note={note} />;
					})}
				</VStack>
			</Flex>
		</>
	);
};

export default NoteCardContainer;
