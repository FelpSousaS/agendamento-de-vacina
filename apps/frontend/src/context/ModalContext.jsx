import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (agendamento, onUpdate, onDelete) => {
    setModalData({ agendamento, onUpdate, onDelete });
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalData }}>
      {children}
    </ModalContext.Provider>
  );
};
