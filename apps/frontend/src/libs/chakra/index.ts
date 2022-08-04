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
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      "body": {
        bg: mode(SNOW, BUNKER)(props),
        height: "100%",
        fontFamily: "Noto Sans JP"
      },
      "html, #__next": {
        height: "100%"
      }
    })
  }
});
