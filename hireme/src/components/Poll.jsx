import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  useColorModeValue,
} from "@chakra-ui/react";

const onSubmit = (data) => console.log(data.selectedOption);

function Poll() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [value, setValue] = useState("1");
  return (
    <Box w="100%" h="100vh" bgColor={"orange.100"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          py={12}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            boxShadow={"2xl"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            p={10}
            spacing={8}
            align={"center"}
          >
            <Stack align={"center"} spacing={2}>
              <Heading
                textTransform={"uppercase"}
                fontSize={"3xl"}
                color={useColorModeValue("gray.800", "gray.200")}
              >
                Would you hire me?
              </Heading>
              <FormControl>
                <input type="radio" value="1" /> Yes I will
                <input type="radio" value="2" /> No I will
                <FormHelperText>Selecet Yes Please</FormHelperText>
              </FormControl>
              <Button
                size="lg"
                color="white"
                bgColor={"blue.600"}
                _hover={{ bg: "blue.500" }}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
}

export default Poll;
