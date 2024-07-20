import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormAgendamento from './FormAgendamento';

describe('FormAgendamento', () => {
  beforeEach(() => {
    render(<FormAgendamento />);
  });

  it('renders form elements', () => {
    // Verifica se o formulário está presente
    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();

    // Verifica se os campos estão presentes
    const nomeInput = screen.getByLabelText(/nome/i);
    expect(nomeInput).toBeInTheDocument();

    const dataNascimentoInput = screen.getByLabelText(/data de nascimento/i);
    expect(dataNascimentoInput).toBeInTheDocument();

    const dataAgendamentoInput = screen.getByLabelText(/data de agendamento/i);
    expect(dataAgendamentoInput).toBeInTheDocument();

    const horarioInput = screen.getByLabelText(/horário/i);
    expect(horarioInput).toBeInTheDocument();

    // Verifica se os botões estão presentes
    const agendarButton = screen.getByRole('button', { name: /agendar/i });
    expect(agendarButton).toBeInTheDocument();

    const limparButton = screen.getByRole('button', { name: /limpar/i });
    expect(limparButton).toBeInTheDocument();
  });

  it('allows user to type in inputs', () => {
    const nomeInput = screen.getByLabelText(/nome/i);
    userEvent.type(nomeInput, 'John Doe');
    expect(nomeInput).toHaveValue('John Doe');

    const dataNascimentoInput = screen.getByLabelText(/data de nascimento/i);
    userEvent.type(dataNascimentoInput, '01/01/1990');
    expect(dataNascimentoInput).toHaveValue('01/01/1990');

    const dataAgendamentoInput = screen.getByLabelText(/data de agendamento/i);
    userEvent.type(dataAgendamentoInput, '01/01/1990');
    expect(dataAgendamentoInput).toHaveValue('01/01/2025');
  });

  it('validates input fields', async () => {
    const nomeInput = screen.getByLabelText(/nome/i);
    const dataNascimentoInput = screen.getByLabelText(/data de nascimento/i);
    const dataAgendamentoInput = screen.getByLabelText(/data de agendamento/i);
    const horarioInput = screen.getByLabelText(/horário/i);
    const agendarButton = screen.getByRole('button', { name: /agendar/i });
    fireEvent.click(agendarButton);
    await waitFor(() => {
      expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Data de Nascimento é obrigatória/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data de Agendamento é obrigatória/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Horário é obrigatório/i)).toBeInTheDocument();
    });

    userEvent.type(nomeInput, 'John Doe');
    fireEvent.click(agendarButton);
    await waitFor(() => {
      expect(screen.queryByText(/Nome é obrigatório/i)).not.toBeInTheDocument();
      expect(
        screen.getByText(/Data de Nascimento é obrigatória/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data de Agendamento é obrigatória/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Horário é obrigatório/i)).toBeInTheDocument();
    });

    userEvent.clear(nomeInput);
    userEvent.type(nomeInput, 'John Doe');
    userEvent.clear(dataNascimentoInput);
    userEvent.type(dataNascimentoInput, '01/01/1990');
    userEvent.clear(dataAgendamentoInput);
    userEvent.type(dataAgendamentoInput, '02/01/1990');
    userEvent.clear(horarioInput);
    userEvent.type(horarioInput, '13:30');
    fireEvent.click(agendarButton);
    await waitFor(() => {
      expect(screen.queryByText(/Nome é obrigatório/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Data de Nascimento é obrigatória/i),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Data de Agendamento é obrigatória/i),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Horário é obrigatório/i),
      ).not.toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    const nomeInput = screen.getByLabelText(/nome/i);
    const dataNascimentoInput = screen.getByLabelText(/data de nascimento/i);
    const dataAgendamentoInput = screen.getByLabelText(/data de agendamento/i);
    const horarioInput = screen.getByLabelText(/horário/i);
    const agendarButton = screen.getByRole('button', { name: /agendar/i });

    userEvent.type(nomeInput, 'John Doe');
    userEvent.clear(dataNascimentoInput);
    userEvent.type(dataNascimentoInput, '01/01/1990');
    userEvent.clear(dataAgendamentoInput);
    userEvent.type(dataAgendamentoInput, '02/01/1990');
    userEvent.clear(horarioInput);
    userEvent.type(horarioInput, '13:30');

    fireEvent.click(agendarButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Agendamento realizado com sucesso!/i),
      ).toBeInTheDocument();
    });

    expect(nomeInput).toHaveValue('');
    expect(dataNascimentoInput).toHaveValue('');
    expect(dataAgendamentoInput).toHaveValue('');
    expect(horarioInput).toHaveValue('');
  });

  it('handles form submission error', async () => {
    const nomeInput = screen.getByLabelText(/nome/i);
    const dataNascimentoInput = screen.getByLabelText(/data de nascimento/i);
    const dataAgendamentoInput = screen.getByLabelText(/data de agendamento/i);
    const horarioInput = screen.getByLabelText(/horário/i);
    const agendarButton = screen.getByRole('button', { name: /agendar/i });

    userEvent.type(nomeInput, 'John Doe');
    userEvent.clear(dataNascimentoInput);
    userEvent.type(dataNascimentoInput, '01/01/1990');
    userEvent.clear(dataAgendamentoInput);
    userEvent.type(dataAgendamentoInput, '02/01/1990');
    userEvent.clear(horarioInput);
    userEvent.type(horarioInput, '13:30');

    fireEvent.click(agendarButton);

    await waitFor(() => {
      expect(screen.getByText(/Erro ao agendar/i)).toBeInTheDocument();
    });
  });
});
