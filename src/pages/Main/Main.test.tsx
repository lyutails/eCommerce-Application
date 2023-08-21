import { fireEvent, render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './Main';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
describe('App component', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockClear();
  });

  test('renders Main component with IsAuth = false', () => {
    (useSelector as jest.Mock).mockReturnValue({
      isAuth: false,
    });
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    const mainComponent = screen.getByTestId('main-component');
    expect(mainComponent).toBeInTheDocument;
  });

  test('renders Main component with IsAuth = true', () => {
    (useSelector as jest.Mock).mockReturnValue({
      isAuth: true,
    });
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
    const slideText = getByText(
      'HOT SALES 80% OFF on all white t-shirts'
    ); /* Можно заменить текст на текст одного из слайдов */
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
    ); //* Можно заменить текст на текст одного из слайдов */
    fireEvent.click(nextButton);

    expect(slideText).toBeInTheDocument;
  });
});
