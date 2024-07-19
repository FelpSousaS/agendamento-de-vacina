import Layout from '../components/Layout';
import TabelaAgendamentos from '../components/TabelaAgendamentos';
import { Box, Spinner, Text, Button, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import PageTitle from '../components/PageTitle';
import EditAtendimentoModal from '../components/EditAtendimentoModal';
import { useNotification } from '../context/NotificationContext';
import { useModal } from '../context/ModalContext';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showNotification } = useNotification();
  const { isOpen, closeModal, modalData } = useModal();

  const fetchAgendamentos = (pageNumber) => {
    setLoading(true);
    api
      .get('/api/agendamentos', { params: { page: pageNumber, pageSize: 20 } })
      .then((response) => {
        setAgendamentos(response.data.items);
        setTotalPages(Math.ceil(response.data.totalCount / 20));
        setPage(pageNumber);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAgendamentos(page);
  }, [page]);

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
          fetchAgendamentos={() => fetchAgendamentos(page)}
        />
        <HStack spacing={4} mt={4} justify="center">
          <Button
            onClick={() => fetchAgendamentos(page - 1)}
            isDisabled={page === 1}
          >
            Anterior
          </Button>
          <Text>{`Página ${page} de ${totalPages}`}</Text>
          <Button
            onClick={() => fetchAgendamentos(page + 1)}
            isDisabled={page === totalPages}
          >
            Próxima
          </Button>
        </HStack>
      </Box>
    );
  }

  return (
    <Layout>
      <PageTitle>Agendamentos</PageTitle>
      {content}
      {isOpen && (
        <EditAtendimentoModal
          isOpen={isOpen}
          onClose={closeModal}
          agendamento={modalData?.agendamento}
          onUpdate={modalData?.onUpdate}
          onDelete={modalData?.onDelete}
        />
      )}
    </Layout>
  );
};

export default Agendamentos;
