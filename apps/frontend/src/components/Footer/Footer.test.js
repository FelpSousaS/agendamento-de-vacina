import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('<Footer />', () => {
  test('renderiza o texto do copyright', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(
      '© 2024 VacinaJá. Todos os direitos reservados.',
    );
    expect(copyrightText).toBeInTheDocument();
  });

  test('renderiza os botões de redes sociais com os links corretos', () => {
    render(<Footer />);
    const linkedinButton = screen.getByText('LinkedIn').closest('a');
    const githubButton = screen.getByText('Github').closest('a');

    expect(linkedinButton).toBeInTheDocument();
    expect(linkedinButton).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/felipesousa-s/',
    );
    expect(githubButton).toBeInTheDocument();
    expect(githubButton).toHaveAttribute(
      'href',
      'https://github.com/FelpSousaS',
    );
  });

  test('aplica os estilos corretos ao botão de rede social', () => {
    render(<Footer />);
    const linkedinButton = screen.getByText('LinkedIn').closest('a');
    const githubButton = screen.getByText('Github').closest('a');

    expect(linkedinButton).toHaveClass('css-db33v2');
    expect(githubButton).toHaveClass('css-db33v2');
  });
});
