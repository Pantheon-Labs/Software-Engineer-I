import {
  Box,
  Button,
  Icon,
  Stack,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
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
            <LinkBox>
              <LinkOverlay href="#home">
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
              </LinkOverlay>
            </LinkBox>
          </Box>
          <Box>
            <Stack direction="row" spacing={4} align="center" mr="20px">
              <LinkBox>
                <LinkOverlay href="#about">
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
                </LinkOverlay>
              </LinkBox>
              <LinkBox>
                <LinkOverlay href="#strength">
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
                </LinkOverlay>
              </LinkBox>
              <LinkBox>
                <LinkOverlay href="test">
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
                </LinkOverlay>
              </LinkBox>
              <LinkBox>
                <LinkOverlay href="#poll">
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
                </LinkOverlay>
              </LinkBox>
              <LinkBox>
                <LinkOverlay
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  isExternal
                >
                  <Button
                    height="40px"
                    width="120px"
                    pr={3}
                    colorScheme="orange"
                    fontSize="sm"
                    variant="outline"
                    leftIcon={<Icon as={CgDanger} />}
                  >
                    Do Not Click
                  </Button>
                </LinkOverlay>
              </LinkBox>
            </Stack>
          </Box>
        </Box>
      </header>
    </div>
  );
}
export default Navbar;
