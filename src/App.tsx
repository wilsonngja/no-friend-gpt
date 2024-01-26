import { CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";
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
