import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: "gray.800",
        color: 'white'
      }
    })
  }
});

export default theme;