import { Box, chakra } from '@chakra-ui/react';

const PageTitle = ({ children }) => {
  return (
    <Box p={6} mt={4} mb={6}>
      <chakra.h1
        fontSize={{ base: '3xl', sm: '5xl' }}
        lineHeight={1}
        fontWeight="bold"
        textAlign="center"
        textTransform="uppercase"
        color="orange"
      >
        {children}
      </chakra.h1>
    </Box>
  );
};

export default PageTitle;
