import { Box, Button, Icon, Stack, Link } from "@chakra-ui/react";
import { GiBiceps } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { TiMessage } from "react-icons/ti";
import { FaPoll } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav">
      <header>
        <Box
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="black"
          height="80px"
          width="100%"
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
              <Button
                height="40px"
                width="120px"
                pr={3}
                colorScheme="orange"
                fontSize="sm"
                variant="outline"
                leftIcon={<Icon as={CgDanger} />}
              >
                <Link
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  textDecoration="none"
                >
                  Do Not Click{" "}
                </Link>
              </Button>
            </Stack>
          </Box>
        </Box>
      </header>
    </div>
  );
}
export default Navbar;
