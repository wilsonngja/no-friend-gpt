import React from "react";
import { Flex, Text, Avatar } from "@chakra-ui/react"; // Import the Image component
import logo from "../resources/images/noFriendGPT_icon.jpg";

interface ImageIconProps {
  iconSize: string; // Template literal type for values like "125px"
  label: string;
  labelFontSize: `${number}px`;
}

/*
Possible Avatar Sizes
2xs, xs, sm, md, lg, xl, 2xl, XXps
*/

const ChatImageIcon: React.FC<ImageIconProps> = ({
  iconSize,
  label,
  labelFontSize,
}) => {
  return (
    <Flex align="center" direction="column">
      <Avatar size={iconSize} src={logo} />
      {/* <Avatar size='xl' src={url}/> */}
      <Text fontSize="sm" color="white">
        {label}
      </Text>
    </Flex>
  );
};

export default ChatImageIcon;
