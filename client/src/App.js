import { Box, Center, Flex, Grid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import NoteCardContainer from './components/NoteCardContainer';

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

	useEffect(() => {
		fetchNotes(url);
	}, []);
	return (
		<Grid minH="100vh">
			<Flex color="white">
				<Box w="50vh" bg="theme.primary" boxShadow="10px 10px">
					<Center>
						{notes && <NoteCardContainer notes={notes} />}
						{error && (
							<h1>
								Oops!! There was a problem grabbing your notes
							</h1>
						)}
					</Center>
				</Box>

				<Box flex="1" bg="theme.background">
					<Text>Box 3</Text>
				</Box>
			</Flex>
		</Grid>
	);
}

export default App;
