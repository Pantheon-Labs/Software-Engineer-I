import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiFile } from "react-icons/fi";
import { ALLOWED_FILE_TYPES } from "./Config";
import { ReactNode, useRef, useState } from "react";
import { Button, Icon, InputGroup, Container, Center } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import axios from "axios";

const handleError = (
  message: string,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  e.target.files = null;
  alert(message);
  return;
};

const App = () => {
  const [helperText, setHelperText] = useState("Max file size is 1mb");
  const [fileURL, setFileURL] = useState("");

  const getSignedUrl = async (file: File) => {
    try {
      const { data } = await axios.post(
        "https://o403ptj373.execute-api.us-east-1.amazonaws.com/signed-url",
        {
          fileType: "." + file.type.split("/")[1],
        }
      );
      console.log(data);

      try {
        const result = await axios.put(data.preSignedUrl, file);
        setHelperText("Uploaded!");
        localStorage.setItem("fileId", result.data.fileId);
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
    setHelperText(`Uploading ${file.name}...`);
    getSignedUrl(file);
  };

  const fileInputRef = useRef();

  return (
    <>
      <Center w="100%" h="100%">
        <Flex align="center" justify="center" w="50%" h="30%" m={20}>
          <FormControl border="1px" borderColor="gray.200" p={8}>
            <Button onClick={() => fileInputRef?.current.click()}>
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
            <FormHelperText mb={8}>{helperText}</FormHelperText>
            {fileURL !== "" && <img alt="Your image" src={fileURL} />}
          </FormControl>
        </Flex>{" "}
      </Center>
    </>
  );
};

export default App;
