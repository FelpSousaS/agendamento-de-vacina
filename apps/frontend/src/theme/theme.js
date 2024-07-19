import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    customOrange: '#f49a28',
    customBlue: '#57c3b6',
    customGreen: '#09A427',
    customRed: '#EC2416',
    customWhite: '#ffffff',
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          borderColor: 'gray.300',
          _focus: {
            borderColor: 'customOrange',
            boxShadow: '0 0 0 1px #f49a28',
          },
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: 'gray.300',
          _checked: {
            bg: '#f49a28',
          },
        },
        thumb: {
          bg: 'white',
          _checked: {
            bg: '#fff',
          },
        },
      },
    },
  },
});

export default theme;
