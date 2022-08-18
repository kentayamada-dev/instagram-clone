/* eslint @typescript-eslint/naming-convention: "off", @typescript-eslint/no-unsafe-assignment: "off", id-length: "off", sort-keys:"off" */

import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { constants } from "../../constants";
import type { ComponentSingleStyleConfig } from "@chakra-ui/react";
import type { ComponentStyleConfig } from "@chakra-ui/theme";
import type { StyleFunctionProps } from "@chakra-ui/theme-tools";

const {
  COLORS: { DODGER_BLUE, WHITE, SNOW, BUNKER, SUVA_GREY, EBONY, RADICAL_RED }
} = constants;

const Modal: ComponentStyleConfig = {
  baseStyle: (props) => ({
    dialog: {
      bg: mode(WHITE, EBONY)(props)
    },
    header: {
      borderBottom: `1px solid ${SUVA_GREY}`,
      padding: "10px"
    },
    body: {
      padding: 0
    },
    footer: {
      padding: 0
    }
  }),
  variants: {
    usersList: {
      dialogContainer: {
        overflowY: "hidden"
      }
    }
  }
};

const Button: ComponentSingleStyleConfig = {
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
    },
    secondary: {
      _hover: {
        _disabled: {
          bg: RADICAL_RED,
          opacity: 0.4
        },
        opacity: 0.8
      },
      bg: RADICAL_RED,
      color: WHITE
    }
  }
};

const theme = extendTheme({
  // https://tailwind.simeongriggs.dev/
  components: {
    Button,
    Modal
  },
  fonts: {
    heading: "Noto Sans JP",
    body: "Noto Sans JP"
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      "body": {
        backgroundColor: mode(SNOW, BUNKER)(props),
        height: "100%",
        overflow: "overlay"
      },
      "html, #__next": {
        height: "100%"
      },
      ".infinite-scroll-component__outerdiv": {
        width: "inherit"
      },
      "::-webkit-scrollbar": {
        width: "16px",
        backgroundColor: "transparent"
      },
      "::-webkit-scrollbar-track": {
        borderRadius: "8px"
      },
      "::-webkit-scrollbar-thumb": {
        "borderRadius": "8px",
        "border": "4px solid transparent",
        "backgroundClip": "content-box",
        "backgroundColor": SUVA_GREY,
        "&:hover": {
          backgroundColor: `${SUVA_GREY}B3`
        }
      }
    })
  }
});

export { theme };
