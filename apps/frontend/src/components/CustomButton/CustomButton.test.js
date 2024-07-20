import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';
import renderer from 'react-test-renderer';

describe('<CustomButton />', () => {
  test('renders button with provided text', () => {
    render(<CustomButton variant="primary">Primary Button</CustomButton>);
    expect(screen.getByText('Primary Button')).toBeInTheDocument();
  });

  test('matches snapshot for primary variant', () => {
    const tree = renderer
      .create(<CustomButton variant="primary">Primary Button</CustomButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('matches snapshot for secondary variant', () => {
    const tree = renderer
      .create(<CustomButton variant="secondary">Secondary Button</CustomButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('applies additional props to the button', () => {
    const { container } = render(
      <CustomButton variant="primary" aria-label="Test Button">
        Test
      </CustomButton>,
    );
    const button = container.querySelector('button');

    if (button) {
      expect(button).toHaveAttribute('aria-label', 'Test Button');
    } else {
      throw new Error('Button element not found');
    }
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <CustomButton variant="primary" onClick={handleClick}>
        Click Me
      </CustomButton>,
    );
    const button = container.querySelector('button');

    if (button) {
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    } else {
      throw new Error('Button element not found');
    }
  });
});
