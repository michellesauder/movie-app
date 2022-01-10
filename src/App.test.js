import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';

test('renders home h1', () => {
  render(<App />);
  const linkElement = screen.getByText(/Movie App/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders correctly', () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
