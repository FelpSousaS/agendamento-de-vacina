import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './Layout';
import Navbar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';

jest.mock('../Navbar/Navbar', () => () => (
  <div data-testid="navbar">Mock Navbar</div>
));
jest.mock('../Footer/Footer', () => () => (
  <div data-testid="footer">Mock Footer</div>
));

describe('<Layout />', () => {
  test('renders Navbar', () => {
    render(<Layout>Test Content</Layout>);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders Footer', () => {
    render(<Layout>Test Content</Layout>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders children content', () => {
    render(
      <Layout>
        <div data-testid="child-content">Test Content</div>
      </Layout>,
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
