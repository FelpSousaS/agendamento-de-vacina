// CustomDatePicker.jsx
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from '@chakra-ui/react';
import pt from 'date-fns/locale/pt-BR';

const CustomInput = forwardRef(({ placeholder, ...props }, ref) => (
  <Input
    {...props}
    ref={ref}
    placeholder={placeholder}
    borderColor="gray.300"
    _focus={{ borderColor: 'customOrange', boxShadow: '0 0 0 1px #f49a28' }}
  />
));

const CustomDatePicker = ({
  selected,
  onChange,
  placeholderText,
  showTimeSelect,
  showTimeSelectOnly,
  timeIntervals,
  dateFormat,
}) => (
  <DatePicker
    selected={selected}
    onChange={onChange}
    dateFormat={dateFormat}
    placeholderText={placeholderText}
    locale={pt}
    customInput={<CustomInput />}
    showTimeSelect={showTimeSelect}
    showTimeSelectOnly={showTimeSelectOnly}
    timeIntervals={timeIntervals}
  />
);

export default CustomDatePicker;
