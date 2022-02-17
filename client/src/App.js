import {
	Box,
	Center,
	Container,
	Flex,
	Grid,
	Square,
	Text,
	theme,
} from '@chakra-ui/react';
import './App.css';

function App() {
	return (
		<Grid minH="100vh">
			<Flex color="white">
				<Box w="50vh" bg="theme.primary">
					<Text>Box 1</Text>
				</Box>

				<Box flex="1" bg="theme.background">
					<Text>Box 3</Text>
				</Box>
			</Flex>
		</Grid>
	);
}

export default App;
