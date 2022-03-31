import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { CONSTANTS } from "../../constants";
import type { StyleFunctionProps } from "@chakra-ui/theme-tools";

const {
  COLORS: { DODGER_BLUE, WHITE, SNOW, BUNKER }
} = CONSTANTS;

export const customizedTheme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          bg: DODGER_BLUE,
          color: WHITE,
          _hover: {
            opacity: 0.8
          }
        }
      }
    }
    /* eslint-disable multiline-comment-style, capitalized-comments */
    // Box: {
    //   variants: {
    //     primary: (props: StyleFunctionProps) => ({
    //       bg: mode("gray.800", "whiteAlpha.900")(props)
    //     })
    //   }
    // }
    /* eslint-enable multiline-comment-style, capitalized-comments  */
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode(SNOW, BUNKER)(props)
      },
      a: {
        color: "#2081E2 !important",
        fontWeight: "bold",
        textDecoration: "none !important",
        _hover: {
          opacity: 0.8
        }
      }
    })
  },
  colors: CONSTANTS.COLORS
});
