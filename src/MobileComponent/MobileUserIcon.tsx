import { Flex, Box, Text } from "@chakra-ui/react";

import React from "react";
import { FaUser } from "react-icons/fa";

const MobileUserIcon = () => {
  return (
    <Flex align="center" direction="column">
      <Box
        bg="red.500" // Change this to the desired background color
        borderRadius="full" // Makes the box circular
        p={1.5} // Adjust padding as needed
      >
        <FaUser size="20px" />
      </Box>
    </Flex>
  );
};

export default MobileUserIcon;
