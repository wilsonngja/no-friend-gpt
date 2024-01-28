import {
  AbsoluteCenter,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLightbulb, FaPaperPlane, FaRedo } from "react-icons/fa";
import QuestionTextField from "./QuestionTextField";
import ChatField from "./UI-component/ChatField";
import ImageIcon from "./UI-component/imageIcon";
import MobileComponent from "./MobileComponent/MobileComponent";

const Dashboard = () => {
  const [chatMessage, setChatMessage] = useState<string[]>([]);

  const [promptButtonActive] = useState(true);

  const initPrompt: string =
    "Your text goes here. Replace this with your actual content. Your text goes here. Replace this with your actual content. Your text goes here. Replace this with your actual content. Your text goes here. Replace this with your actual content. Your text goes here. Replace this with your actual content.";
  const [suggestedPromptText, setSuggestedPromptText] =
    useState<string>(initPrompt);

  useEffect(() => {
    getSuggestedQuery();
  }, []);

  useEffect(() => {
    console.log(suggestedPromptText);
  }, [suggestedPromptText]);

  const getSuggestedQuery = async () => {
    const res = await axios.get(`http://52.220.229.139/generate-prompts`);
    console.log(res.data);
    setSuggestedPromptText(res.data.msg);
  };

  const getLLMAnswer = async ({ text }: { text: string }) => {
    setChatMessage([...chatMessage, text]);

    console.log(chatMessage.length);

    if (chatMessage.length === 0) {
      const res = await axios.post(
        `http://52.220.229.139/get-initial-response`,
        {
          text: text,
        }
      );
      setChatMessage([...chatMessage, text, res.data.response]);
    } else {
      const res = await axios.post(`http://52.220.229.139/get-more-response`, {
        text: text,
      });
      setChatMessage([...chatMessage, text, res.data.response]);
    }
  };

  const handleSubmit = async () => {
    // Handle the submitted question via onQuestionSubmit

    // Optionally, you can pass the question to a parent component

    getLLMAnswer({ text: suggestedPromptText });

    getSuggestedQuery();
  };

  useEffect(() => {
    console.log(chatMessage);
  }, [chatMessage]);

  const regenerateSuggestedPrompt = async () => {
    const res = await axios.get(`http://52.220.229.139/generate-prompts`);
    console.log(res.data);
    setSuggestedPromptText(res.data.msg);
  };

  const layout = useBreakpointValue({ base: "mobile", md: "desktop" });

  return (
    <>
      {layout === "mobile" ? (
        <Box
          height="91vh"
          width="full"
          display="flex"
          flexDirection="column"
          px={2}
        >
          <MobileComponent />
        </Box>
      ) : (
        <Box
          height="98vh"
          width="full"
          display="flex"
          flexDirection="column"
          px={2}
        >
          <Grid
            templateRows="1fr"
            templateColumns="28% 1% 70%"
            gap={2}
            flex="1"
            width="100%"
            height="100%"
          >
            {/* First column */}
            <GridItem>
              <Grid
                templateRows="78% 7% 15%"
                gap={0}
                flex="1"
                width="100%"
                height="100%"
              >
                {/* First row within the first column */}
                <GridItem
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* Your content for the first column, first row */}
                  <Flex direction="column" align="center">
                    <ImageIcon
                      iconSize="2xl"
                      label="No Friend GPT"
                      labelFontSize="30px"
                    />
                    <Text fontSize="lg" fontWeight="semibold">
                      Argue at your own risk!
                    </Text>
                  </Flex>
                </GridItem>

                {/* Second row within the first column */}
                <GridItem
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Flex direction="column" align="center" marginLeft="2">
                    <FaLightbulb
                      size={30}
                      color="yellow"
                      style={{ transform: "rotate(-20deg)" }}
                    />
                  </Flex>
                  <Text>Let's get started!</Text>
                </GridItem>

                {/* third row within the first column */}
                <GridItem
                  display="flex"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <HStack height="100%" width="100%">
                    <Box
                      bg="gray.700" // Set the background color
                      borderRadius="md" // Apply border-radius for rounded edges
                      px={2} // Add padding to the box
                      py={1}
                      marginLeft="2"
                      height="60%"
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

                    <VStack height="60%">
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
                        icon={
                          <FaPaperPlane style={{ transform: "rotate(0deg)" }} />
                        }
                        size="sm"
                        bg="green.300" // Set the background color directly on the IconButton
                        rounded="md" // Apply border-radius to achieve a circular shape
                        aria-label={""}
                        onClick={handleSubmit}
                        _hover={{ bgColor: "green.200" }}
                      />
                    </VStack>
                  </HStack>
                  {/* Textbox */}

                  {/* Buttons */}
                  <Flex
                    marginRight="2"
                    marginLeft="2"
                    marginTop="4"
                    alignItems="center" // Center-align items vertically
                  ></Flex>
                </GridItem>
              </Grid>
            </GridItem>

            <GridItem my={4}>
              <Divider orientation="vertical" />
            </GridItem>

            {/* Second column */}
            <GridItem
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
            >
              <ChatField chatMessages={chatMessage} />

              <Box
                // position="fixed"
                // textAlign="center"
                mt="auto"
                // mb="20px"
                boxSizing="content-box"
                borderTop="1px solid"
                borderColor="gray.700"
                pt={4}
                mx={4}
              >
                <QuestionTextField
                  setChatMessage={setChatMessage}
                  chatMessage={chatMessage}
                />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
