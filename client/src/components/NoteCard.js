import { Box, Center, Text } from '@chakra-ui/react';

const NoteCard = ({ note, selectNote }) => {
	return (
		<>
			<Box
				onClick={() => {
					selectNote(note);
				}}
				minH="10vh"
				minW="50vh"
				bg={'theme.secondary'}
				_hover={{
					background: 'theme.background',
					color: 'black',
				}}
			>
				<Center w="100%" h="100%">
					<Text fontSize="1xl" color="black">
						{note.title}
					</Text>
				</Center>
			</Box>
		</>
	);
};

export default NoteCard;
