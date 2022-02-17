import { Box, Text } from '@chakra-ui/react';

const SelectedNoteContainer = ({ note }) => {
	console.log(note);
	return (
		<>
			<Box
				minW=""
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				bg="theme.paper"
			>
				<Text color="black">{note.content}</Text>
			</Box>
		</>
	);
};

export default SelectedNoteContainer;
