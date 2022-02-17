import { Box, Divider, Text } from '@chakra-ui/react';

const SelectedNoteContainer = ({ note }) => {
	console.log(note);
	return (
		<>
			<Box
				w="120vh"
				minH="80vh"
				borderWidth="5px"
				borderRadius="lg"
				overflow="hidden"
				bg="theme.paper"
			>
				<Box style={{ padding: '40px' }}>
					<Text fontSize="3xl" color="black" marginBottom="20px">
						{note.title}
					</Text>
					<Text marginLeft="20px" color="black">
						{note.content}
					</Text>
				</Box>
			</Box>
		</>
	);
};

export default SelectedNoteContainer;
