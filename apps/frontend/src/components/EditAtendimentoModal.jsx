import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Box,
  Switch,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import CustomDatePicker from './CustomDatePicker';
import CustomButton from './CustomButton'; // Importe o CustomButton

function EditAtendimentoModal({
  isOpen,
  onClose,
  agendamento,
  onUpdate,
  onDelete,
}) {
  const initialRef = useRef(null);
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState(null);
  const [dataAgendamento, setDataAgendamento] = useState(null);
  const [horario, setHorario] = useState(null);
  const [statusAtendimento, setStatusAtendimento] = useState(false);

  useEffect(() => {
    if (agendamento) {
      setNome(agendamento.nome);
      setDataNasc(new Date(agendamento.dataNasc));
      setDataAgendamento(new Date(agendamento.dataAgendamento));
      setHorario(new Date(agendamento.dataAgendamento));
      setStatusAtendimento(agendamento.statusAtendimento);
    }
  }, [agendamento]);

  const handleDateChange = (date, field) => {
    if (field === 'dataNasc') {
      setDataNasc(date);
    } else if (field === 'dataAgendamento') {
      setDataAgendamento(date);
    } else if (field === 'horario') {
      setHorario(date);
    }
  };

  const handleUpdate = () => {
    const updatedDateTime = new Date(dataAgendamento);
    if (updatedDateTime && horario) {
      updatedDateTime.setHours(horario.getHours());
      updatedDateTime.setMinutes(horario.getMinutes());
    }

    const updatedAgendamento = {
      ...agendamento,
      nome,
      dataNasc: dataNasc ? dataNasc.toISOString() : null,
      dataAgendamento: updatedDateTime ? updatedDateTime.toISOString() : null,
      statusAtendimento,
    };

    onUpdate(updatedAgendamento);
    onClose();
  };

  const handleDelete = () => {
    if (agendamento && onDelete) {
      onDelete(agendamento.id);
      onClose();
    } else {
      console.error('Função onDelete não definida');
    }
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Agendamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              ref={initialRef}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              borderColor="customOrange"
              _focus={{
                borderColor: 'customOrange',
                boxShadow: '0 0 0 1px #f49a28',
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Data de Nascimento</FormLabel>
            <CustomDatePicker
              selected={dataNasc}
              onChange={(date) => handleDateChange(date, 'dataNasc')}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a data de nascimento"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Data do Agendamento</FormLabel>
            <CustomDatePicker
              selected={dataAgendamento}
              onChange={(date) => handleDateChange(date, 'dataAgendamento')}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a data do agendamento"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Horário</FormLabel>
            <CustomDatePicker
              selected={horario}
              onChange={(date) => handleDateChange(date, 'horario')}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              dateFormat="HH:mm"
              placeholderText="Selecione o horário"
            />
          </FormControl>

          <FormControl mt={4} display="flex" alignItems="center">
            <FormLabel htmlFor="atendido" mb="0">
              Atendido
            </FormLabel>
            <Switch
              id="atendido"
              isChecked={statusAtendimento}
              onChange={(e) => setStatusAtendimento(e.target.checked)}
              ml={2}
              sx={{
                '&[data-checked]': {
                  '--switch-track-bg': '#f49a28',
                  '--switch-thumb-bg': '#fff',
                },
                '&[data-unchecked]': {
                  '--switch-track-bg': '#e2e8f0',
                  '--switch-thumb-bg': '#fff',
                },
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Box display="flex" justifyContent="space-between" width="100%">
            <IconButton
              icon={<DeleteIcon />}
              color="#f49a28"
              aria-label="Excluir"
              onClick={handleDelete}
              mr={3}
            />
            <Box>
              <CustomButton
                variant="primary"
                onClick={handleUpdate}
                width="100px"
                mr={3}
              >
                Atualizar
              </CustomButton>
              <CustomButton variant="secondary" onClick={onClose} width="100px">
                Cancelar
              </CustomButton>
            </Box>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditAtendimentoModal;
