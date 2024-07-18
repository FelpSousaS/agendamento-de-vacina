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
  Button,
  Switch,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt-BR';

function EditAtendimentoModal({ isOpen, onClose, agendamento, onUpdate }) {
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
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Data de Nascimento</FormLabel>
            <DatePicker
              selected={dataNasc}
              onChange={(date) => handleDateChange(date, 'dataNasc')}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a data de nascimento"
              locale={pt}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Data do Agendamento</FormLabel>
            <DatePicker
              selected={dataAgendamento}
              onChange={(date) => handleDateChange(date, 'dataAgendamento')}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a data do agendamento"
              locale={pt}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Horário</FormLabel>
            <DatePicker
              selected={horario}
              onChange={(date) => handleDateChange(date, 'horario')}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              dateFormat="HH:mm"
              placeholderText="Selecione o horário"
              locale={pt}
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
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
            Atualizar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditAtendimentoModal;
