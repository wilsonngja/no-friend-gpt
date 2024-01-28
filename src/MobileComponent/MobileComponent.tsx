import {
  AbsoluteCenter,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import bgLogo from "../resources/images/noFriendGPT_icon.jpg";
import QuestionTextField from "../QuestionTextField";
import MobileChatField from "./MobileChatField";

const MobileComponent = () => {
  const [chatMessage, setChatMessage] = useState<string[]>([]);

  return (
    <Box position="relative" height="100%">
      <Box
        position="absolute"
        top="0"
        left="0"
        height="100%"
        width="100%"
        backgroundImage={`url(${bgLogo})`}
        backgroundSize="50%"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        opacity="0.25" // Set the desired opacity for the background image
        zIndex="-1"
      />
      <Grid templateColumns="repeat(1, 1fr)" height="100%" position="relative">
        {/* The Text component will not be affected by the opacity */}
        <GridItem
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <MobileChatField
            chatMessages={chatMessage}
            setChatMessage={setChatMessage}
          />

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
  );
};

export default MobileComponent;
