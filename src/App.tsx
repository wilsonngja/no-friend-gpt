import * as React from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  GridItem,
  CSSReset,
  Flex,
  IconButton,
  HStack,
  extendTheme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import ImageIcon from "./UI-component/imageIcon";
import {
  FaLightbulb,
  FaIcons,
  FaRedo,
  FaReply /* Replace with actual icons */,
  FaPaperPlane,
} from "react-icons/fa";
import ChatField from "./UI-component/ChatField";
import Dashboard from "./Dashboard";

const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Set default color mode to dark
    useSystemColorMode: false, // Set to `true` if you want to use the system color mode setting
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    {/* Ensure the container takes up the entire height of the viewport */}
    <Dashboard />
  </ChakraProvider>
);
