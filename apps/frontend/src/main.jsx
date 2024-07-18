import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/routes.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { ModalProvider } from './context/ModalContext';
import { NotificationProvider } from './context/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <NotificationProvider>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </NotificationProvider>
  </ChakraProvider>,
);
