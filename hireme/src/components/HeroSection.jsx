import React from "react";
import { Box, Text, Container, Button, Icon } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
function HeroSection() {
  return (
    <>
      <Box
        w="100%"
        h="100vh"
        bgImage="https://i.ibb.co/s2YqRWd/explosion.jpg"
        bgSize="cover"
        pos="relative"
      >
        <Container
          centerContent
          maxW="100%"
          top="300"
          bottom="0"
          left="0"
          right="0"
          pos="absolute"
        >
          <Text fontSize="5xl" color="tomato">
            Get Ready for the most amazing thing you had ever seen!!!
            <Text fontSize="3xl" color="blue" textAlign="center">
              {" "}
              Join me to learn about me!
            </Text>
          </Text>
          <Button
            leftIcon={<Icon as={AiFillStar} />}
            colorScheme="pink"
            size="md"
            variant="solid"
          >
            Begin Our adventure
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default HeroSection;
