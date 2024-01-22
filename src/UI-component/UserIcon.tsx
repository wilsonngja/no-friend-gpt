import React from "react";
import { Flex, Text, Avatar, Box } from "@chakra-ui/react"; // Import the Image component
import logo from '../resources/images/noFriendGPT_icon.jpg'
import { FaUser } from "react-icons/fa";

interface UserIconProps {
  iconSize: `${number}px`; // Template literal type for values like "125px"
  label: string
  labelFontSize: `${number}px`;
}

/*
Possible Avatar Sizes
2xs, xs, sm, md, lg, xl, 2xl, XXps
*/

const UserIcon: React.FC<UserIconProps> = ({ iconSize, label, labelFontSize }) => {
    
    return (
    <Flex align="center" direction="column">
        <Box
            bg="red.500" // Change this to the desired background color
            borderRadius="full" // Makes the box circular
            p={1.5} // Adjust padding as needed
        >
            <FaUser size={iconSize}/>
        </Box>
        
        {/* <Avatar size='xl' src={url}/> */}
        <Text fontSize={labelFontSize} color="white">{label}</Text>
    </Flex>
  );
};

export default UserIcon;
