import React, { createContext, useContext, useState } from 'react';
import EditAtendimentoModal from '../components/EditAtendimentoModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    agendamento: null,
    onUpdate: null,
  });

  const openModal = (agendamento, onUpdate) => {
    setModalProps({
      isOpen: true,
      agendamento,
      onUpdate,
    });
  };

  const closeModal = () => {
    setModalProps({
      isOpen: false,
      agendamento: null,
      onUpdate: null,
    });
  };

  const handleUpdateAgendamento = async (agendamentoAtualizado) => {
    if (modalProps.onUpdate) {
      try {
        await modalProps.onUpdate(agendamentoAtualizado);
      } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
      }
    }
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {modalProps.isOpen && (
        <EditAtendimentoModal
          isOpen={modalProps.isOpen}
          onClose={closeModal}
          agendamento={modalProps.agendamento}
          onUpdate={handleUpdateAgendamento}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
