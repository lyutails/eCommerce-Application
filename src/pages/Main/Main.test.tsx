import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './Main';

describe('Main component', () => {
  test('renders Main component', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    const mainComponent = screen.getByTestId('main-component');
    expect(mainComponent).toBeInTheDocument;
  });

  test('clicking on "prev" button should change the slide to the previous one', () => {
    const { getByText } = render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    const prevButton = screen.getByTestId('prev');
    const slideText = getByText('HOT SALES 80% OFF on all white t-shirts');
    fireEvent.click(prevButton);
    expect(slideText).toBeInTheDocument;
  });

  test('clicking on "next" button should change the slide to the next one', () => {
    const { getByText } = render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId('next');
    const slideText = getByText(
      '2 = 1 !!! two t-shirts with the same art by price of one'
    );
    fireEvent.click(nextButton);

    expect(slideText).toBeInTheDocument;
  });
});
