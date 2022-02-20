import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormHelperText,
  Button,
  Flex,
  Stack,
  Heading,
  Container,
  AspectRatio,
} from "@chakra-ui/react";

function Poll() {
  const [value, setValue] = useState("1");
  const [showPoll, setPoll] = useState(true);
  const [counter, setCounter] = useState(0);

  const lines = [
    {
      text: "Sorry you cannot do that 😎 😎 😎 ",
    },
    {
      text: "Come on don't be like that 🥺🥺🥺",
    },
    {
      text: "Click the yes button please 😊 😊 😊 ",
    },
    {
      text: "This form only accept Yes.😉😉😉",
    },
    {
      text: "NOOOOOOOOOOOOO you don't want to do that 😡😡😡",
    },
  ];
  const handleClick = () => {
    if (value === "1") {
      setPoll(false);
    } else {
      alert(lines[counter].text);
      if (counter + 1 >= lines.length) {
        setCounter(0);
      } else {
        setCounter(counter + 1);
      }

      setValue("1");
    }
  };

  return (
    <Box w="100%" h="100vh" bgColor={"orange.100"} id="poll">
      {showPoll ? (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          py={12}
          bg={"gray.50"}
        >
          <Stack
            boxShadow={"2xl"}
            bg={"white"}
            rounded={"xl"}
            p={10}
            spacing={8}
            align={"center"}
          >
            <Stack align={"center"} spacing={2}>
              <Heading
                textTransform={"uppercase"}
                fontSize={"3xl"}
                color={"gray.800"}
              >
                Would you hire me?
              </Heading>
              <FormControl>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack spacing={4} direction="row">
                    <Radio value="1">Yes of Course!!!!!!</Radio>
                    <Radio value="2">No sorry :(</Radio>
                  </Stack>
                </RadioGroup>
                <FormHelperText>Selecet Yes Please</FormHelperText>
              </FormControl>
              <Button
                size="lg"
                color="white"
                bgColor={"blue.600"}
                _hover={{ bg: "blue.500" }}
                onClick={handleClick}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      ) : (
        <Container maxW={"3xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 20 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
              color="red"
            >
              Thank You SO MUCH 🥳🥳 <br />
            </Heading>
            <AspectRatio maxW="860px">
              <iframe
                title="michael"
                src="https://c.tenor.com/dI7PKF421EgAAAAd/thank-you-bow.gif"
              />
            </AspectRatio>
          </Stack>
        </Container>
      )}
    </Box>
  );
}

export default Poll;
