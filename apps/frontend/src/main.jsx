import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/routes';
import { ModalProvider } from './context/ModalContext';
import { NotificationProvider } from './context/NotificationContext';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
    <NotificationProvider>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </NotificationProvider>
  </ChakraProvider>,
);
