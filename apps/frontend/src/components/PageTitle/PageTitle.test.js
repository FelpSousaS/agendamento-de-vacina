import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageTitle from './PageTitle';

describe('<PageTitle />', () => {
  test('renderiza o componente PageTitle com texto do children', () => {
    render(<PageTitle>Teste Titulo</PageTitle>);
    const titleElement = screen.getByText(/Teste Titulo/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renderiza com estilos corretos', () => {
    render(<PageTitle>Titulo Estilizado</PageTitle>);
    const titleElement = screen.getByText(/Titulo Estilizado/i);
    expect(titleElement).toHaveStyle({
      fontSize: '3xl',
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
      color: 'orange',
    });
  });

  test('aplica o tamanho da fonte responsiva corretamente', () => {
    render(<PageTitle>Titulo Responsivo</PageTitle>);
    const titleElement = screen.getByText(/Titulo Responsivo/i);
    expect(titleElement).toHaveStyle({ fontSize: '3xl' });
  });
});
