import { Box, Button, Icon, Stack } from "@chakra-ui/react";
import { GiBiceps } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { TiMessage } from "react-icons/ti";
import { FaPoll } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <header>
        <Box
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          position="sticky"
          bg="black"
          height="80px"
        >
          <Box>
            <Button
              size="sm"
              colorScheme="white"
              ml="20px"
              cursor="pointer"
              fontSize="2rem"
              display="flex"
              leftIcon={<Icon as={AiOutlineHome} />}
            >
              Home
            </Button>
          </Box>
          <Box>
            <Stack direction="row" spacing={4} align="center" mr="20px">
              <Button
                height="40px"
                width="110px"
                pr={3}
                colorScheme="teal"
                fontSize="sm"
                variant="outline"
                leftIcon={<Icon as={GoPerson} />}
              >
                About Me
              </Button>
              <Button
                height="40px"
                width="110px"
                rightIcon={<Icon as={GiBiceps} />}
                pr={3}
                colorScheme="red"
                fontSize="sm"
                variant="outline"
              >
                Strength
              </Button>
              <Button
                height="40px"
                width="110px"
                pr={3}
                colorScheme="blue"
                fontSize="sm"
                variant="outline"
                leftIcon={<Icon as={TiMessage} />}
              >
                Testimonial
              </Button>
              <Button
                height="40px"
                width="110px"
                pr={3}
                colorScheme="pink"
                fontSize="sm"
                variant="outline"
                rightIcon={<Icon as={FaPoll} />}
              >
                Poll
              </Button>
            </Stack>
          </Box>
        </Box>
      </header>
    </>
  );
}
export default Navbar;
