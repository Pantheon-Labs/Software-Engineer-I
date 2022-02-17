import { Box } from '@chakra-ui/react';

const NoteCard = ({ note }) => {
	return (
		<>
			<Box
				minH="10vh"
				minW="45vh"
				bg={'theme.secondary'}
				_hover={{
					background: '#D8E2DC',
					color: 'black',
					boxShadow: '5px 5px 10px',
				}}
			>
				<h1>{note.title}</h1>
			</Box>
		</>
	);
};

export default NoteCard;
