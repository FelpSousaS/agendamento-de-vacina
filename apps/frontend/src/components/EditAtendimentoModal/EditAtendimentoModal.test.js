import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import EditAtendimentoModal from './EditAtendimentoModal';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

// Mock do CustomDatePicker
jest.mock('../CustomDatePicker/CustomDatePicker', () => ({
  __esModule: true,
  default: ({ selected, onChange }) => (
    <input
      type="date"
      value={selected ? selected.toISOString().split('T')[0] : ''}
      onChange={(e) => onChange(new Date(e.target.value))}
    />
  ),
}));

const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();
const mockOnClose = jest.fn();

describe('<EditAtendimentoModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with provided data', () => {
    const agendamento = {
      id: '1',
      nome: 'João',
      dataNasc: '1990-01-01T00:00:00.000Z',
      dataAgendamento: '2024-07-20T10:00:00.000Z',
      statusAtendimento: true,
    };

    render(
      <ChakraProvider>
        <EditAtendimentoModal
          isOpen={true}
          onClose={mockOnClose}
          agendamento={agendamento}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </ChakraProvider>,
    );

    expect(screen.getByLabelText('Nome')).toHaveValue('João');
    expect(screen.getByLabelText('Data de Nascimento')).toHaveValue(
      '1990-01-01',
    );
    expect(screen.getByLabelText('Data do Agendamento')).toHaveValue(
      '2024-07-20',
    );
    expect(screen.getByLabelText('Horário')).toHaveValue('10:00');
    expect(screen.getByLabelText('Atendido')).toBeChecked();
  });

  test('calls onUpdate when "Atualizar" button is clicked', () => {
    render(
      <ChakraProvider>
        <EditAtendimentoModal
          isOpen={true}
          onClose={mockOnClose}
          agendamento={{
            id: '1',
            nome: '',
            dataNasc: '',
            dataAgendamento: '',
            horario: '',
            statusAtendimento: false,
          }}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </ChakraProvider>,
    );

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Maria' },
    });
    fireEvent.click(screen.getByText('Atualizar'));

    expect(mockOnUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: 'Maria',
      }),
    );
  });

  test('calls onDelete when delete icon is clicked', () => {
    render(
      <ChakraProvider>
        <EditAtendimentoModal
          isOpen={true}
          onClose={mockOnClose}
          agendamento={{ id: '1' }}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByLabelText('Excluir'));

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('calls onClose when "Cancelar" button is clicked', () => {
    render(
      <ChakraProvider>
        <EditAtendimentoModal
          isOpen={true}
          onClose={mockOnClose}
          agendamento={{
            id: '1',
            nome: '',
            dataNasc: '',
            dataAgendamento: '',
            horario: '',
            statusAtendimento: false,
          }}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByText('Cancelar'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('updates switch state correctly', () => {
    render(
      <ChakraProvider>
        <EditAtendimentoModal
          isOpen={true}
          onClose={mockOnClose}
          agendamento={{ statusAtendimento: false }}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </ChakraProvider>,
    );

    const switchInput = screen.getByLabelText('Atendido');
    expect(switchInput).not.toBeChecked();

    fireEvent.click(switchInput);
    expect(switchInput).toBeChecked();
  });
});
