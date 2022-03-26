import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/theme-tools";

export const customizedTheme = extendTheme({
  components: {
    Button: {
      variants: {
        "with-shadow": {
          bg: "DODGER_BLUE",
          color: "WHITE",
          _hover: {
            opacity: 0.8
          }
        }
      }
    }
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("SNOW", "BUNKER")(props)
      },
      a: {
        color: "#2081E2 !important",
        textDecoration: "none !important",
        _hover: {
          opacity: 0.8
        }
      }
    })
  },
  colors: {
    // https://www.htmlcsscolor.com/
    SNOW: "#FAFAFA",
    BUNKER: "#202225",
    BLACK_PEARL: "#04111D",
    DODGER_BLUE: "#2081E2",
    WHITE: "#FFFFFF"
  }
});
