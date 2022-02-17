import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  Spinner,
  VStack,
  HStack,
  Link,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ALLOWED_FILE_TYPES } from "./Config";
import { useRef, useState } from "react";
import { Button, Icon } from "@chakra-ui/react";
import axios from "axios";
import useResults from "./useResults";
import { GiSpeaker } from "react-icons/gi";
// @ts-ignore

const handleError = (
  message: string,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  e.target.files = null;
  alert(message);
  return;
};

const App = () => {
  // TODO set at build time
  const API_URL = "https://o403ptj373.execute-api.us-east-1.amazonaws.com";
  const [uploadStatus, setUploadStatus] = useState(false);
  const [fileURL, setFileURL] = useState("");
  const [fileId, setFileId] = useState("");

  const { results, isResultsLoading, isResultsError } = useResults(
    API_URL,
    fileId
  );

  const getSignedUrl = async (file: File) => {
    try {
      const { data } = await axios.post(API_URL + "/signed-url", {
        fileType: "." + file.type.split("/")[1],
      });
      console.log(data);

      try {
        await axios.put(data.preSignedUrl, file);
        setUploadStatus(false);
        setFileId(data.fileId);
      } catch (error) {
        console.error(error);
        alert(
          "An error ocurred uploading the file, check console for more info"
        );
      }
    } catch (error) {
      console.error(error);
      alert("An error getting a presigned url, check console for more info");
    }
  };

  const validateFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log("Validating", files);

    if (!files || files.length < 1) {
      return;
    }

    if (files.length > 1) {
      return handleError("Only upload one file please :)", e);
    }

    const file = Array.from(files)[0];
    console.log(file);
    const fsMb = file.size / (1024 * 1024);
    const MAX_FILE_SIZE = 1;
    if (fsMb > MAX_FILE_SIZE) {
      return handleError(
        "Max file size is 1mb, please choose a smaller image",
        e
      );
    }

    const url = URL.createObjectURL(file);
    setFileURL(url);
    setUploadStatus(true);
    getSignedUrl(file);
  };

  const fileInputRef = useRef();

  const UserImage = fileURL !== "" && (
    <Image mt={2} alt="Your uploaded file" src={fileURL} />
  );

  const playAudio = (link: string) => {
    const audio = new Audio(link);

    audio.play();
  };
  const resultsLoaded = results && !isResultsError && !isResultsLoading;
  const Results = isResultsError ? (
    <p>An error ocurred </p>
  ) : isResultsLoading ? (
    <p>Loading results...</p>
  ) : (
    results &&
    results.map((result: any) => (
      <>
        <HStack rounded={"lg"} p={6} h="100%" w="100%">
          <VStack mr="10">
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {result.label}
            </Text>
            <Text>{result.confidence.toFixed(2)}%</Text>
          </VStack>
          <HStack w="100%" align="end" justifyContent="space-between">
            {result?.translations.map((detail: any) => (
              <Box key={detail.TargetLanguageCode}>
                <img
                  alt={`${detail.TargetLanguageCode} flag`}
                  // The flag codes are slightly different than the codes for translate / polly
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${
                    detail.TargetLanguageCode === "es-MX"
                      ? "MX"
                      : detail.TargetLanguageCode === "ja"
                      ? "JP"
                      : detail.TargetLanguageCode.toUpperCase()
                  }.svg`}
                />
                <Button
                  onClick={() =>
                    playAudio(
                      `https://development-pantheon-assets.s3.amazonaws.com/audio/${result.label}/${detail.TargetLanguageCode}`
                    )
                  }
                  leftIcon={<Icon w={8} h={8} as={GiSpeaker} />}
                >
                  {detail.TranslatedText}
                </Button>{" "}
              </Box>
            ))}
          </HStack>
        </HStack>
        {results.indexOf(result) !== results.length - 1 && <Divider />}
      </>
    ))
  );

  return (
    <>
      <Flex align="center" justify="center">
        <Flex
          align="center"
          justify="center"
          border="2px"
          rounded={"lg"}
          borderColor="gray.600"
          h="100%"
          w="25%"
          m={20}
          p={8}
        >
          <FormControl align="center" justify="center">
            <Button
              isLoading={uploadStatus}
              loadingText="Uploading..."
              onClick={() => fileInputRef?.current.click()}
            >
              Upload an image
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              multiple={false}
              _hover={{
                bg: "#dddfe2",
                transform: "scale(0.98)",
                borderColor: "#bec3c9",
              }}
              hidden
              size="lg"
              border="2px"
              borderColor="red.200"
              //@ts-ignore
              onInput={(e) => validateFile(e)}
              accept={ALLOWED_FILE_TYPES.join(", ")}
            />
            <FormHelperText mb={2}>Max file size is 1mb</FormHelperText>
            {resultsLoaded ? (
              <Link
                mb={12}
                color="blue.500"
                href={API_URL + "/results?fileId=" + fileId}
                isExternal
              >
                View API result <ExternalLinkIcon mx="2px" />
              </Link>
            ) : null}

            {UserImage}
          </FormControl>
        </Flex>
        {resultsLoaded ? (
          <Flex
            border="2px"
            align="start"
            justify="start"
            rounded={"lg"}
            h="100%"
            w="50%"
            m={20}
            p={2}
          >
            <VStack w="100%">{Results}</VStack>
          </Flex>
        ) : (
          <Flex align="center" justify="center" h="100%" w="50%" m={20} p={2}>
            {isResultsLoading ? (
              <Spinner
                thickness="4px"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              <Heading>&larr;Upload a picture :)</Heading>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default App;
