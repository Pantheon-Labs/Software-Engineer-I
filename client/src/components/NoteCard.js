import { Box, Divider, Text } from '@chakra-ui/react';
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
				w="48vh"
				bg={bg}
				borderRadius="20px"
				_hover={{
					background:
						note === selectedNote
							? 'theme.selected'
							: 'theme.paper',
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
							? note.content[0].split(' ').slice(0, 5).join(' ')
							: note.content.split(' ').slice(0, 5).join(' ')}
						...
					</Text>
				</Box>

				{/* </Center> */}
			</Box>
			<Divider />
		</>
	);
};

export default NoteCard;
