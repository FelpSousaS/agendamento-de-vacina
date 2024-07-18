import Layout from '../components/Layout';
import TabelaAgendamentos from '../components/TabelaAgendamentos';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import PageTitle from '../components/PageTitle';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <TabelaAgendamentos agendamentos={agendamentos} />
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
