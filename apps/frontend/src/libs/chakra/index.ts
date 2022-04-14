/* eslint @typescript-eslint/naming-convention: "off", @typescript-eslint/no-unsafe-assignment: "off", id-length: "off", sort-keys:"off" */

import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { constants } from "../../constants";
import type { StyleFunctionProps } from "@chakra-ui/theme-tools";

const {
  COLORS: { DODGER_BLUE, WHITE, SNOW, BUNKER }
} = constants;

export const myTheme = extendTheme({
  colors: {
    ...constants.COLORS,
    cancel: {
      50: "#FDE8E9",
      100: "#F9BEC3",
      200: "#F4949C",
      300: "#F06A75",
      400: "#EC414E",
      500: "#E81728",
      600: "#BA1220",
      700: "#8B0E18",
      800: "#5D0910",
      900: "#2E0508"
    }
  },
  components: {
    Button: {
      variants: {
        primary: {
          _hover: {
            _disabled: {
              bg: DODGER_BLUE,
              opacity: 0.4
            },
            opacity: 0.8
          },
          bg: DODGER_BLUE,
          color: WHITE
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
      // eslint-disable-next-line lines-around-comment
      /*
       * "a": {
       *   _hover: {
       *     opacity: 0.8
       *   },
       *   color: "#2081E2 !important",
       *   fontWeight: "bold",
       *   textDecoration: "none !important"
       * },
       */
      "body": {
        bg: mode(SNOW, BUNKER)(props),
        height: "100%"
      },
      "html, #__next": {
        height: "100%"
      }
    })
  }
});
