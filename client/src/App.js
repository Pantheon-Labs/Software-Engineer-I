import { Box, Center, Flex, Grid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import NoteCardContainer from './components/NoteCardContainer';
import SelectedNoteContainer from './components/SelectedNoteContainer';

const url = 'http://localhost:5000/api/v1/notes';

function App() {
	const fetchNotes = async (url = '') => {
		try {
			const res = await fetch(url);
			const data = await res.json();
			setNotes(data);
			return data;
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};
	const [notes, setNotes] = useState(null);
	const [error, setError] = useState(null);
	const [selectedNote, setSelectedNote] = useState(null);

	useEffect(() => {
		fetchNotes(url);
	}, []);

	const selectNote = (note) => {
		setSelectedNote(note);
	};
	return (
		<Grid minH="100vh">
			<Flex color="white">
				<Box w="50vh" bg="theme.primary" boxShadow="10px 10px">
					<Center>
						{notes && (
							<NoteCardContainer
								selectNote={selectNote}
								notes={notes}
								selectedNote={selectedNote}
							/>
						)}
						{error && (
							<h1>
								Oops!! There was a problem grabbing your notes
							</h1>
						)}
					</Center>
				</Box>

				<Box flex="1" bg="theme.background">
					<Center w="100%" h="100%">
						{selectedNote && (
							<SelectedNoteContainer note={selectedNote} />
						)}
					</Center>
				</Box>
			</Flex>
		</Grid>
	);
}

export default App;
