import {
  Grid,
  GridItem,
  HStack,
  Text,
  Box,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ChatImageIcon from "../UI-component/ChatImageIcon";
import UserIcon from "../UI-component/UserIcon";
import MobileUserIcon from "./MobileUserIcon";
import MobileGPTImageIcon from "./MobileGPTImageIcon";
import { FaPaperPlane, FaRedo } from "react-icons/fa";
import axios from "axios";

interface ChatFieldProps {
  chatMessages: string[]; // Assuming chatMessage is an array of strings
  setChatMessage: React.Dispatch<React.SetStateAction<string[]>>;
}

const MobileChatField: React.FC<ChatFieldProps> = ({
  chatMessages,
  setChatMessage,
}) => {
  const initPrompt: string = "Generating prompt text...";
  const [suggestedPromptText, setSuggestedPromptText] =
    useState<string>(initPrompt);

  useEffect(() => {
    getSuggestedQuery();
  }, []);

  const regenerateSuggestedPrompt = async () => {
    const res = await axios.get(`http://52.220.229.139/generate-prompts`);
    console.log(res.data);
    setSuggestedPromptText(res.data.msg);
  };

  const getLLMAnswer = async ({ text }: { text: string }) => {
    setChatMessage([...chatMessages, text]);

    console.log(chatMessages.length);

    if (chatMessages.length === 0) {
      const res = await axios.post(
        `http://52.220.229.139/get-initial-response`,
        {
          text: text,
        }
      );
      setChatMessage([...chatMessages, text, res.data.response]);
    } else {
      const res = await axios.post(`http://52.220.229.139/get-more-response`, {
        text: text,
      });
      setChatMessage([...chatMessages, text, res.data.response]);
    }
  };
  const getSuggestedQuery = async () => {
    const res = await axios.get(`http://52.220.229.139/generate-prompts`);
    console.log(res.data);
    setSuggestedPromptText(res.data.msg);
  };

  const handleSubmit = async () => {
    // Handle the submitted question via onQuestionSubmit

    // Optionally, you can pass the question to a parent component

    getLLMAnswer({ text: suggestedPromptText });

    getSuggestedQuery();
  };

  const [promptButtonActive] = useState(true);

  return (
    <VStack height="100%" width="100%">
      <Box height="15%" width="100%">
        <HStack height="100%" width="100%">
          <Box
            bg="gray.700" // Set the background color
            borderRadius="md" // Apply border-radius for rounded edges
            px={2} // Add padding to the box
            py={1}
            marginLeft="2"
            height="70%"
            width="100%"
          >
            <Box
              height="100%"
              overflowY="auto"
              css={{
                width: "100%",
                minWidth: "100%",
                "&::-webkit-scrollbar": {
                  width: "0.2rem",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "RGBA(255, 255, 255, 0.36)",
                },
              }}
            >
              <Text fontSize="sm" width="100%">
                {suggestedPromptText || " "}
              </Text>
            </Box>
          </Box>

          <VStack height="70%">
            <IconButton
              icon={<FaRedo style={{ transform: "rotate(90deg)" }} />}
              size="sm"
              bg="orange.400" // Set the background color directly on the IconButton
              rounded="md" // Apply border-radius to achieve a circular shape
              aria-label={""}
              onClick={regenerateSuggestedPrompt}
              disabled={!promptButtonActive}
              _hover={{ bgColor: "orange.300" }}
            />
            <IconButton
              icon={<FaPaperPlane style={{ transform: "rotate(0deg)" }} />}
              size="sm"
              bg="green.300" // Set the background color directly on the IconButton
              rounded="md" // Apply border-radius to achieve a circular shape
              aria-label={""}
              onClick={handleSubmit}
              _hover={{ bgColor: "green.200" }}
            />
          </VStack>
        </HStack>
      </Box>
      <Grid
        mt={2}
        mx={2}
        maxHeight="82vh"
        templateColumns="repeat(1, 1fr)"
        gap={5}
        pr={2}
        autoRows="minmax(min-content, max-content)"
        width="calc(100% - 2px)"
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "0.2rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "RGBA(255, 255, 255, 0.36)",
          },
        }}
      >
        {chatMessages &&
          chatMessages.map((chatMessage: string | null, index: number) => (
            <GridItem>
              <Box>
                {index % 2 === 0 ? (
                  <Box display="flex" justifyContent="flex-start" ml={2}>
                    <VStack align="stretch">
                      <HStack>
                        <MobileUserIcon />
                        <Text>Me</Text>
                      </HStack>
                      <Box
                        bgColor="teal.600"
                        padding={2}
                        borderRadius="lg"
                        mt={2}
                      >
                        <Text
                          textAlign="left"
                          margin="auto"
                          // justifyContent="center"
                          // alignItems="center"
                          display="inline-block"
                          fontSize="sm"
                        >
                          {chatMessage}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="flex-start">
                    <VStack align="stretch">
                      <HStack>
                        <MobileGPTImageIcon />
                        <Text>NoFriend GPT</Text>
                      </HStack>
                      <Box
                        bgColor="gray.600"
                        padding={2}
                        borderRadius="lg"
                        mt={2}
                      >
                        <Text
                          textAlign="left"
                          margin="auto"
                          // justifyContent="center"
                          // alignItems="center"
                          display="inline-block"
                          fontSize="sm"
                        >
                          {chatMessage}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                )}
              </Box>
            </GridItem>
          ))}
      </Grid>
    </VStack>
  );
};

export default MobileChatField;
