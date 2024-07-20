import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TabelaAgendamentos from './TabelaAgendamentos';
import axios from 'axios';
import { ModalProvider } from '../../context/ModalContext';
import { NotificationProvider } from '../../context/NotificationContext';

jest.mock('axios');

const mockFetchAgendamentos = jest.fn();
const mockOnUpdate = jest.fn();

const mockAgendamentos = [
  {
    id: 1,
    nome: 'João da Silva',
    dataAgendamento: '2024-07-19T10:00:00Z',
    statusAtendimento: true,
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    dataAgendamento: '2024-07-20T14:00:00Z',
    statusAtendimento: false,
  },
];

describe('<TabelaAgendamentos />', () => {
  it('should render table with mocked data', () => {
    render(
      <NotificationProvider>
        <ModalProvider>
          <TabelaAgendamentos
            agendamentos={mockAgendamentos}
            onUpdate={mockOnUpdate}
            fetchAgendamentos={mockFetchAgendamentos}
          />
        </ModalProvider>
      </NotificationProvider>,
    );

    expect(screen.getByText('João da Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Oliveira')).toBeInTheDocument();
    expect(screen.getByText('19/07/2024')).toBeInTheDocument();
    expect(screen.getByText('20/07/2024')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('14:00')).toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();
    expect(screen.getByText('Não')).toBeInTheDocument();
  });

  it('should call fetchAgendamentos on delete', async () => {
    axios.delete.mockResolvedValueOnce({
      data: { message: 'Agendamento excluído com sucesso' },
    });

    render(
      <NotificationProvider>
        <ModalProvider>
          <TabelaAgendamentos
            agendamentos={mockAgendamentos}
            onUpdate={mockOnUpdate}
            fetchAgendamentos={mockFetchAgendamentos}
          />
        </ModalProvider>
      </NotificationProvider>,
    );

    fireEvent.click(screen.getByText('João da Silva'));
    fireEvent.click(screen.getByText('Excluir'));

    await waitFor(() => {
      expect(mockFetchAgendamentos).toHaveBeenCalled();
      expect(
        screen.getByText('Agendamento excluído com sucesso'),
      ).toBeInTheDocument();
    });
  });

  it('should open modal on row click', () => {
    render(
      <NotificationProvider>
        <ModalProvider>
          <TabelaAgendamentos
            agendamentos={mockAgendamentos}
            onUpdate={mockOnUpdate}
            fetchAgendamentos={mockFetchAgendamentos}
          />
        </ModalProvider>
      </NotificationProvider>,
    );

    fireEvent.click(screen.getByText('João da Silva'));

    expect(mockOnUpdate).toHaveBeenCalled();
  });

  it('should handle API error correctly', async () => {
    axios.delete.mockRejectedValueOnce({
      response: {
        data: { message: 'Erro ao excluir agendamento' },
      },
    });

    render(
      <NotificationProvider>
        <ModalProvider>
          <TabelaAgendamentos
            agendamentos={mockAgendamentos}
            onUpdate={mockOnUpdate}
            fetchAgendamentos={mockFetchAgendamentos}
          />
        </ModalProvider>
      </NotificationProvider>,
    );

    fireEvent.click(screen.getByText('João da Silva'));
    fireEvent.click(screen.getByText('Excluir'));

    await waitFor(() => {
      expect(
        screen.getByText('Erro ao excluir agendamento'),
      ).toBeInTheDocument();
    });
  });
});
