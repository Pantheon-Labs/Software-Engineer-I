import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
} from "@chakra-ui/react";

function Testimonial() {
  const people = [
    {
      name: "Mom",
      text: "He is a smart boy. Always my bao bao",
      title: "My Mom",
      image:
        "https://news.cgtn.com/news/3d3d674d3559444d33457a6333566d54/img/e518a9a543f940c5977c2fd67961ab94/e518a9a543f940c5977c2fd67961ab94.jpg",
    },
    {
      name: "Obi-Wan Kenobi",
      text: "Matthew will beat me even if I have the high ground.",
      title: "Jedi Master",
      image:
        "https://api.time.com/wp-content/uploads/2015/12/star-wars-episode-iii-revenge-of-the-sith-obi-wan.jpg",
    },
    {
      name: "Eren Yeager",
      text: "I will move foward with Matthew and he is the hope for all Eldians",
      title: "Founding Titan, Leader of the Yeagerists",
      image:
        "https://thecinemaholic.com/wp-content/uploads/2021/03/0_iRU5IQ2KGkDyGzyw.jpg",
    },
    {
      name: "Shaquille O'Neal",
      text: "Matthew is the real shark, I can't even guard him",
      title: "Famous Basketball Player",
      image:
        "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/614.png&w=350&h=254",
    },
    {
      name: "Shrek",
      text: "I'll let Matthew to stay in my swamp.",
      title: "Owner of the Swamp",
      image: "https://i.insider.com/60817ec5354dde0018c06960?width=700",
    },
  ];
  return (
    <Box bgColor="gray.200" w="100%" h="100vh" id="test">
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"} mt="80px">
          <Heading>Testimonial from famous people</Heading>
          <Text>They all come from differnet worlds and could be anyone.</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          {people.map((p, index) => (
            <Box key={index} className="one" maxW={"275px"}>
              <Stack
                bgColor="white.200"
                boxShadow={"lg"}
                p={8}
                rounded={"xl"}
                align={"center"}
                pos={"relative"}
                _after={{
                  content: `""`,
                  w: 0,
                  h: 0,
                  borderLeft: "solid transparent",
                  borderLeftWidth: 16,
                  borderRight: "solid transparent",
                  borderRightWidth: 16,
                  borderTop: "solid",
                  borderTopWidth: 16,
                  borderTopColor: "gray.800",
                  pos: "absolute",
                  bottom: "-16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Heading as={"h3"} fontSize={"xl"}>
                  {p.title}
                </Heading>
                <Text textAlign={"center"} color={"gray.600"} fontSize={"sm"}>
                  {p.text}
                </Text>
              </Stack>
              <Flex align={"center"} mt={8} direction={"column"}>
                <Avatar src={p.image} alt={p.name} mb={2} />
                <Stack spacing={-1} align={"center"}>
                  <Text fontWeight={600}>{p.name}</Text>
                </Stack>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Testimonial;
