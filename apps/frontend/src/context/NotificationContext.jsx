import React, { createContext, useContext, useState } from 'react';
import { Alert, AlertIcon, Box, CloseButton } from '@chakra-ui/react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, status) => {
    setNotification({ message, status });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          zIndex="toast"
          minWidth="600px"
        >
          <Alert status={notification.status} borderRadius="md" boxShadow="lg">
            <AlertIcon />
            {notification.message}
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={closeNotification}
            />
          </Alert>
        </Box>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
