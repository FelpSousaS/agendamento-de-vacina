import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './Hero';
import '@testing-library/jest-dom';

describe('<Hero />', () => {
  test('renders Hero component with welcome message', () => {
    render(
      <Router>
        <Hero />
      </Router>,
    );

    expect(screen.getByText(/Seja bem-vindo ao VacinaJá/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A saúde de todos depende de cada um de nós!/i),
    ).toBeInTheDocument();
  });

  test('renders Hero component with correct buttons', () => {
    render(
      <Router>
        <Hero />
      </Router>,
    );

    expect(screen.getByText('Agendar')).toBeInTheDocument();
    expect(screen.getByText('Lista de Agendamentos')).toBeInTheDocument();
  });

  test('navigates to /agendamentos/novo on clicking Agendar button', () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockImplementation(() => mockNavigate);

    render(
      <Router>
        <Hero />
      </Router>,
    );

    const agendarButton = screen.getByText('Agendar');
    fireEvent.click(agendarButton);
    expect(mockNavigate).toHaveBeenCalledWith('/agendamentos/novo');
  });

  test('navigates to /agendamentos on clicking Lista de Agendamentos button', () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockImplementation(() => mockNavigate);

    render(
      <Router>
        <Hero />
      </Router>,
    );

    const listaButton = screen.getByText('Lista de Agendamentos');
    fireEvent.click(listaButton);
    expect(mockNavigate).toHaveBeenCalledWith('/agendamentos');
  });
});
