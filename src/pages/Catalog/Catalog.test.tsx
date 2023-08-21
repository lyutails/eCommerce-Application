import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CatalogPage from './Catalog';

describe('App component', () => {
  test('renders Main component', () => {
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );
    const catalogComponent = screen.getByTestId('catalog-component');
    expect(catalogComponent).toBeInTheDocument;
  });
});
