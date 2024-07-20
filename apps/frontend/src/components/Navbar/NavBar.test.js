import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './NavBar';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

const mockUseLocation = jest.requireMock('react-router-dom').useLocation;

describe('<Navbar />', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue({ pathname: '/' });
  });

  test('renders all navigation links', () => {
    render(
      <Router>
        <ChakraProvider>
          <Navbar />
        </ChakraProvider>
      </Router>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Agendar')).toBeInTheDocument();
    expect(screen.getByText('Lista de Agendamentos')).toBeInTheDocument();
  });

  test('toggles mobile menu when hamburger icon is clicked', () => {
    render(
      <Router>
        <ChakraProvider>
          <Navbar />
        </ChakraProvider>
      </Router>,
    );

    const hamburgerIcon = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(hamburgerIcon);

    const navLinks = screen.getAllByRole('link', {
      name: /Home|Agendar|Lista de Agendamentos/i,
    });
    navLinks.forEach((link) => {
      expect(link).toBeVisible();
    });

    fireEvent.click(hamburgerIcon);
    navLinks.forEach((link) => {
      expect(link).not.toBeVisible();
    });
  });
});
