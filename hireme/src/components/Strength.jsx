import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Image,
  Flex,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Strength() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "80%" });
  const side = useBreakpointValue({ base: "30%", md: "50px" });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: "Boring Skills (Programming)",
      text: "I know Python,C++, JavaScript,HTML,CSS and some TypeScript. I love to programm because I like to solve problems. I'm willing to learn new languages and technology because I like to learn new things.",
      image:
        "https://www.memesmonkey.com/images/memesmonkey/a5/a5cbb543b42a3fe0d3b70d64f36a212a.jpeg",
    },
    {
      title: "Communication Skills",
      text: "I have great communication skills. As a jungler main in league of legends, I often have to communicate with 12th years-old who things they are good. In addition, I also have very high eq since as we all know league of legends is the most toxic community ever and the toxicity double when you are the jungler.",
      image: "https://images-cdn.9gag.com/photo/ayo7BGp_700b.jpg",
    },
    {
      title: "Expert Martial Artist",
      text: "I use to be a white belt in karate and I watch almost all of Jackie Chan movies.",
      image:
        "https://www.thefamouspeople.com/profiles/images/jackie-chan-4.jpg",
    },
    {
      title: "Ball God",
      text: "I played basketball since I was in middle school and taking ankles left and right. My best move is in and out crossover.",
      image: "https://i.redd.it/ua6oywsx85a31.jpg",
    },
    {
      title: "Humor",
      text: "I can be funny sometime 😂😂😂",
      image:
        "https://www.atriumstaff.com/wp-content/uploads/2017/08/cover-photo.jpg",
    },
  ];

  return (
    <Box
      w="100%"
      h="100vh"
      bgColor="pink.200"
      position="relative"
      id="strength"
    >
      <Box
        position="absolute"
        top="100"
        left="200"
        w="75%"
        h="80vh"
        overflow={"hidden"}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((card, index) => (
            <Box key={index} height={"6xl"} position="relative">
              {/* This is the block you need to change, to customize the caption */}
              <Container
                size="container.lg"
                height="600px"
                position="relative"
                py={12}
                maxW={"5xl"}
              >
                <Stack
                  spacing={6}
                  w={"full"}
                  maxW={"ig"}
                  pos="absolute"
                  top="50%"
                  transform="translate(0,-50%)"
                >
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Stack spacing={4}>
                      <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                        {card.title}
                      </Heading>
                      <Text color={"gray.500"} fontSize={"lg"}>
                        {card.text}
                      </Text>
                    </Stack>
                    <Flex>
                      <Image
                        rounded={"md"}
                        alt={"feature image"}
                        src={card.image}
                        objectFit={"cover"}
                      />
                    </Flex>
                  </SimpleGrid>
                </Stack>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
