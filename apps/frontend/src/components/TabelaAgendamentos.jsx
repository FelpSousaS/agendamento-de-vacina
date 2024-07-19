import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useModal } from '../context/ModalContext';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

const TabelaAgendamentos = ({ agendamentos, onUpdate, fetchAgendamentos }) => {
  const { openModal } = useModal();
  const { showNotification } = useNotification();

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/api/agendamentos/${id}`);
      console.log('Agendamento excluído com sucesso');
      fetchAgendamentos();
      showNotification(response.data.message, 'success');
    } catch (error) {
      console.error('Erro ao deletar o agendamento:', error);
      const errorMessage =
        error.response?.data?.message || 'Erro ao atualizar agendamento';
      showNotification(errorMessage, 'error');
    }
  };

  const handleOpenModal = (agendamento) => {
    openModal(agendamento, onUpdate, handleDelete);
  };

  return (
    <TableContainer bg="customBlue">
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
                  bg="white"
                  borderRadius="100%"
                  p={1}
                  boxShadow="base"
                >
                  {agendamento.statusAtendimento ? (
                    <CheckIcon color="customGreen" boxSize={5} padding={0.5} />
                  ) : (
                    <CloseIcon color="customRed" boxSize={5} padding={1} />
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
  );
};

export default TabelaAgendamentos;
