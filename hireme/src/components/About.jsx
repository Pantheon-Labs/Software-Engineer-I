import React from "react";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";

export default function About() {
  return (
    <div id="about">
      <Container maxW={"5xl"} py={12} h="100vh">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt="100px">
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              My Story
            </Text>
            <Heading>Who am I and Why I want to work at Pantheon Labs?</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              My name is Matthew, and I am a hard-working and enthusiastic
              person who found great passion in computer science. I am a recent
              graduate at City College of New York majoring in Computer Science.
              I was recently a volunteer as a full-stack developer at Helping
              Hands.After my internships and graduation are crawling on me, I am
              looking for new opportunities that can further hone my skills and
              increase my experiences in the field. I love solving problems and
              am great at working as a team. I want to work at Pantheon Labs
              because I also want to help people to bring their ideas into the
              world. Is always my dream to be able to use the things I learn to
              help people and I believe I can do that at Pantheon Labs.
              Furthermore, the position is remote so I can work at home and
              because of this assignment, Pantheon Labs made me feel like is a
              very chill company. Plus the benefits are lit 🔥🔥🔥🔥.
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            ></Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={"https://i.ibb.co/VQYZd2H/selfie.png"}
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </div>
  );
}
