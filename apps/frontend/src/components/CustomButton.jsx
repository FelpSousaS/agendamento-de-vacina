import React from 'react';
import { Button } from '@chakra-ui/react';
import buttonStyles from '../style/buttonStyles';

const CustomButton = ({ variant = 'primary', children, ...props }) => {
  return (
    <Button {...props} {...buttonStyles[variant]}>
      {children}
    </Button>
  );
};

export default CustomButton;
