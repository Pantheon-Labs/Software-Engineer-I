import { Text, HStack, Flex, Link } from '@chakra-ui/react';

const Links = () => {
	return (
		<Flex align="bottom">
			<HStack spacing="24px">
				<Text marginLeft="20px" color="blue" fontSize={'2xl'}>
					<Link href="sambencivengo.com" isExternal>
						sambencivengo.com{' '}
					</Link>
				</Text>
				<Text marginLeft="20px" color="blue" fontSize={'2xl'}>
					<Link href="https://github.com/sambencivengo" isExternal>
						GitHub
					</Link>
				</Text>
				<Text marginLeft="20px" color="blue" fontSize={'2xl'}>
					<Link
						href="https://www.linkedin.com/in/sam-bencivengo-201000222/"
						isExternal
					>
						LinkedIn{' '}
					</Link>
				</Text>
				<Text marginLeft="20px" color="blue" fontSize={'2xl'}>
					<Link
						href="https://www.instagram.com/samuels_birds/"
						isExternal
					>
						Birdwatching
					</Link>
				</Text>
			</HStack>
		</Flex>
	);
};

export default Links;
