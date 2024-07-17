import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/routes.jsx';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AppRoutes />
  </ChakraProvider>,
);
