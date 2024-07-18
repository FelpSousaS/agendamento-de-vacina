import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  extendTheme,
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useModal } from '../context/ModalContext';

const theme = extendTheme({
  colors: {
    customOrange: '#f49a28',
    customBlue: '#57c3b6',
    customGreen: '#09A427',
    customRed: '#EC2416',
    customWhite: '#ffffff',
  },
});

const TabelaAgendamentos = ({ agendamentos, onUpdate }) => {
  const { openModal } = useModal();

  const handleOpenModal = (agendamento) => {
    openModal(agendamento, onUpdate);
  };

  return (
    <ChakraProvider theme={theme}>
      <TableContainer bg={theme.colors.customBlue}>
        <Table variant="simple" colorScheme="black">
          <Thead bg="customOrange">
            <Tr>
              <Th fontSize="medium" textAlign="center" color="white">
                Nome
              </Th>
              <Th fontSize="medium" textAlign="center" color="white">
                Data
              </Th>
              <Th fontSize="medium" textAlign="center" color="white">
                Horário
              </Th>
              <Th fontSize="medium" textAlign="center" color="white">
                Atendido
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {agendamentos.map((agendamento) => (
              <Tr
                key={agendamento.id}
                onClick={() => handleOpenModal(agendamento)}
                cursor="pointer"
              >
                <Td textAlign="center" color="white">
                  {agendamento.nome}
                </Td>
                <Td textAlign="center" color="white">
                  {format(new Date(agendamento.dataAgendamento), 'dd/MM/yyyy')}
                </Td>
                <Td textAlign="center" color="white">
                  {format(new Date(agendamento.dataAgendamento), 'HH:mm')}
                </Td>
                <Td textAlign="center" color="white" position="relative">
                  <Box
                    display="inline-block"
                    bg={theme.colors.white}
                    borderRadius="100%"
                    p={1}
                    boxShadow="base"
                  >
                    {agendamento.statusAtendimento ? (
                      <CheckIcon
                        color={theme.colors.customGreen}
                        boxSize={5}
                        padding={0.5}
                      />
                    ) : (
                      <CloseIcon
                        color={theme.colors.customRed}
                        boxSize={5}
                        padding={1}
                      />
                    )}
                  </Box>
                  <span style={{ marginLeft: '8px', color: 'white' }}>
                    {agendamento.statusAtendimento ? ' Sim' : ' Não'}
                  </span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ChakraProvider>
  );
};

export default TabelaAgendamentos;
