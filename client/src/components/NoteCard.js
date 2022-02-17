import { Box, Center, Divider, Text, useStyleConfig } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const NoteCard = ({ note, selectNote, selectedNote }) => {
	const [bg, setBg] = useState('theme.secondary');
	const [fontColor, setFontColor] = useState('black');
	const [border, setBorder] = useState('1px solid #6c757d');

	useEffect(() => {
		if (note === selectedNote) {
			setBg('theme.selected');
			setFontColor('white');
			setBorder(null);
		} else {
			setBg('theme.secondary');
			setFontColor('black');
			setBorder('.5px solid #6c757d');
		}
	}, [selectNote]);
	return (
		<>
			<Box
				onClick={() => {
					selectNote(note);
				}}
				minH="13vh"
				minW="45vh"
				bg={bg}
				borderRadius="20px"
				_hover={{
					background:
						note === selectedNote
							? 'theme.selected'
							: 'theme.background',
					color: 'black',
					borderColor: 'theme.text',
				}}
			>
				{/* <Center w="100%" h="100%"> */}
				<Box marginLeft="40px" marginRight="40px" marginTop="20px">
					<Text
						style={{ fontWeight: 800 }}
						fontSize="1xl"
						color={fontColor}
					>
						{note.title}
					</Text>
					<Text marginLeft="20px" fontSize="1xl" color={fontColor}>
						{note.list
							? note.content[0].slice(0, 30)
							: note.content.slice(0, 30)}{' '}
						...
					</Text>
				</Box>
				{/* </Center> */}
			</Box>
		</>
	);
};

export default NoteCard;
