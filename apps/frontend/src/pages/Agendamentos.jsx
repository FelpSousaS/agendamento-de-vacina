import Layout from '../components/Layout';
import TabelaAgendamentos from '../components/TabelaAgendamentos';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import PageTitle from '../components/PageTitle';
import { useNotification } from '../context/NotificationContext';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    api
      .get('/api/agendamentos')
      .then((response) => {
        setAgendamentos(response.data.items);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleUpdateAgendamento = async (agendamentoAtualizado) => {
    try {
      const response = await api.put(
        `/api/agendamentos/${agendamentoAtualizado.id}`,
        agendamentoAtualizado,
      );
      setAgendamentos((prevAgendamentos) =>
        prevAgendamentos.map((agendamento) =>
          agendamento.id === agendamentoAtualizado.id
            ? agendamentoAtualizado
            : agendamento,
        ),
      );
      showNotification(response.data.message, 'success');
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      const errorMessage =
        error.response?.data?.message || 'Erro ao atualizar agendamento';
      showNotification(errorMessage, 'error');
    }
  };

  let content;

  if (loading) {
    content = (
      <Box p={6} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Carregando agendamentos...</Text>
      </Box>
    );
  } else if (error) {
    content = (
      <Box p={6} textAlign="center">
        <Text color="red.500">Erro ao carregar dados: {error}</Text>
      </Box>
    );
  } else {
    content = (
      <Box p={6}>
        <TabelaAgendamentos
          agendamentos={agendamentos}
          onUpdate={handleUpdateAgendamento}
        />
      </Box>
    );
  }

  return (
    <Layout>
      <PageTitle>Agendamentos</PageTitle>
      {content}
    </Layout>
  );
};

export default Agendamentos;
