import {
  Flex,
  FormControl,
  FormHelperText,
  Input,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ALLOWED_FILE_TYPES } from "./Config";
import { useRef, useState, useEffect } from "react";
import { Button, Icon, InputGroup, Container, Center } from "@chakra-ui/react";
import axios from "axios";
import useResults from "./useResults";
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
      return handleError("File is required", e);
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

  const Image = fileURL !== "" && (
    <img alt="Your uploaded file" src={fileURL} />
  );

  const Results = isResultsError ? (
    <p>An error ocurred </p>
  ) : isResultsLoading ? (
    <p>Loading results...</p>
  ) : (
    JSON.stringify(results?.labels)
  );

  // <div>
  //   <ul>
  //     {JSON.parse(results?.labels).map((item: any) => (
  //       <li>{JSON.stringify(item)}</li>
  //     ))}
  //   </ul>
  // </div>
  return (
    <>
      <Center w="100%" h="100%">
        <Flex align="center" justify="center" w="50%" h="30%" m={20}>
          <FormControl border="1px" borderColor="gray.200" p={8}>
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
            {fileId !== "" && fileId ? (
              <Link
                mb={8}
                color="blue.500"
                href={API_URL + "/results?fileId=" + fileId}
                isExternal
              >
                View API results <ExternalLinkIcon mx="2px" />
              </Link>
            ) : null}

            {Image}
            {Results}
          </FormControl>
        </Flex>{" "}
      </Center>
    </>
  );
};

export default App;
