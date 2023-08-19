import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './Main';

describe('App component', () => {
  test('renders Main component', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    const mainComponent = screen.getByTestId('main-component');
    expect(mainComponent).toBeInTheDocument;
  });
});
