import React, { useEffect, forwardRef } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  HStack,
  extendTheme,
  ChakraProvider,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/DataPickerStyles.css';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import pt from 'date-fns/locale/pt-BR';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

// Definindo o tema
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
  },
});

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  dataNasc: z
    .date()
    .nullable()
    .refine((date) => date !== null, 'Data de Nascimento é obrigatória')
    .refine(
      (date) => date < new Date(),
      'Data de Nascimento deve ser no passado',
    ),
  dataAgendamento: z
    .date()
    .nullable()
    .refine((date) => date !== null, 'Data de Agendamento é obrigatória')
    .refine(
      (date) => date > new Date(),
      'Data de Agendamento deve ser no futuro',
    ),
  horario: z
    .date()
    .nullable()
    .refine((date) => date !== null, 'Horário é obrigatório'),
});

const CustomInput = forwardRef(({ placeholder, ...props }, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
      placeholder={placeholder}
      borderColor="gray.300"
      _focus={{ borderColor: 'customOrange', boxShadow: '0 0 0 1px #f49a28' }}
    />
  );
});

const FormAgendamento = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: '',
      dataNasc: null,
      dataAgendamento: null,
      horario: null,
    },
    mode: 'onTouched',
  });

  const { showNotification } = useNotification();

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setValue('nome', data.nome || '');
      setValue('dataNasc', data.dataNasc ? new Date(data.dataNasc) : null);
      setValue(
        'dataAgendamento',
        data.dataAgendamento ? new Date(data.dataAgendamento) : null,
      );
      setValue('horario', data.horario ? new Date(data.horario) : null);
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      const formattedData = {
        nome: value.nome || '',
        dataNasc: value.dataNasc ? value.dataNasc.getTime() : null,
        dataAgendamento: value.dataAgendamento
          ? value.dataAgendamento.getTime()
          : null,
        horario: value.horario ? value.horario.getTime() : null,
      };
      localStorage.setItem('formData', JSON.stringify(formattedData));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    try {
      const dataAgendamentoISO = new Date(
        data.dataAgendamento.getFullYear(),
        data.dataAgendamento.getMonth(),
        data.dataAgendamento.getDate(),
        data.horario.getHours(),
        data.horario.getMinutes(),
      ).toISOString();

      const response = await api.post('/api/agendamentos', {
        nome: data.nome,
        dataNasc: data.dataNasc.toISOString(),
        dataAgendamento: dataAgendamentoISO,
      });

      showNotification(response.data.message, 'success');

      reset();
      localStorage.removeItem('formData');
    } catch (error) {
      console.error('Erro ao agendar:', error);
      const errorMessage =
        error.response?.data?.message || 'Erro ao realizar agendamento';
      showNotification(errorMessage, 'error');
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex align={'center'} justify={'center'}>
        <Box
          rounded={'lg'}
          bg={theme.colors.customBlue}
          boxShadow={'lg'}
          p={8}
          marginBottom={'100px'}
          width={'full'}
          maxWidth={'xl'}
        >
          <Stack spacing={5}>
            <FormControl id="nome" isInvalid={!!errors.nome} color={'white'}>
              <FormLabel htmlFor="nome" color={'customWhite'}>
                Nome
              </FormLabel>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    id="nome"
                    {...field}
                    placeholder="Digite seu nome"
                  />
                )}
              />
              {errors.nome && <Box color="red">{errors.nome.message}</Box>}
            </FormControl>

            <FormControl
              id="dataNasc"
              isInvalid={!!errors.dataNasc}
              color={'white'}
            >
              <FormLabel htmlFor="dataNasc">Data de Nascimento</FormLabel>
              <Controller
                name="dataNasc"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id="dataNasc"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Data de nascimento"
                    locale={pt}
                    onBlur={() => field.onBlur()}
                    customInput={<CustomInput />}
                  />
                )}
              />
              {errors.dataNasc && (
                <Box color="red.500">{errors.dataNasc.message}</Box>
              )}
            </FormControl>

            <FormControl
              id="dataAgendamento"
              isInvalid={!!errors.dataAgendamento}
              color={'white'}
            >
              <FormLabel htmlFor="dataAgendamento">
                Data de Agendamento
              </FormLabel>
              <Controller
                name="dataAgendamento"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id="dataAgendamento"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Data do agendamento"
                    locale={pt}
                    onBlur={() => field.onBlur()}
                    customInput={<CustomInput />}
                  />
                )}
              />
              {errors.dataAgendamento && (
                <Box color="red.500">{errors.dataAgendamento.message}</Box>
              )}
            </FormControl>

            <FormControl
              id="horario"
              isInvalid={!!errors.horario}
              color={'white'}
            >
              <FormLabel htmlFor="horario">Horário</FormLabel>
              <Controller
                name="horario"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id="horario"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    dateFormat="HH:mm"
                    placeholderText="Selecione o horário"
                    locale={pt}
                    onBlur={() => field.onBlur()}
                    customInput={<CustomInput />}
                  />
                )}
              />
              {errors.horario && (
                <Box color="red.500">{errors.horario.message}</Box>
              )}
            </FormControl>

            <HStack spacing={4} pt={4} justify="flex-end">
              <Button
                bg={theme.colors.customOrange}
                color={theme.colors.customWhite}
                _hover={{ bg: 'rgba(244,154,40,0.8)' }}
                onClick={handleSubmit(onSubmit)}
              >
                Agendar
              </Button>
              <Button
                variant="outline"
                borderColor={theme.colors.customOrange}
                color={theme.colors.customOrange}
                bg={theme.colors.customWhite}
                onClick={() => {
                  reset();
                  localStorage.removeItem('formData');
                }}
              >
                Limpar
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default FormAgendamento;
