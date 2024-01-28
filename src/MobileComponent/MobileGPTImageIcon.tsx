import { Avatar, Flex } from "@chakra-ui/react";
import logo from "../resources/images/noFriendGPT_icon.jpg";

const MobileGPTImageIcon = () => {
  return (
    <Flex align="center" direction="column">
      <Avatar size="md" src={logo} />
      {/* <Avatar size='xl' src={url}/> */}
    </Flex>
  );
};

export default MobileGPTImageIcon;
