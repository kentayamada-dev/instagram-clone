/* eslint @typescript-eslint/naming-convention: "off", @typescript-eslint/no-unsafe-assignment: "off", id-length: "off" */

import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { constants } from "../../constants";
import type { StyleFunctionProps } from "@chakra-ui/theme-tools";

const {
  COLORS: { DODGER_BLUE, WHITE, SNOW, BUNKER }
} = constants;

export const customizedTheme = extendTheme({
  colors: constants.COLORS,
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
      a: {
        _hover: {
          opacity: 0.8
        },
        color: "#2081E2 !important",
        fontWeight: "bold",
        textDecoration: "none !important"
      },
      body: {
        bg: mode(SNOW, BUNKER)(props)
      }
    })
  }
});
