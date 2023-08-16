import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import App from './App';
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
describe('App component', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockClear();
  });
  test('renders Main component when user is authenticated', () => {
    (useSelector as jest.Mock).mockReturnValue(true);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const mainComponent = screen.getByTestId('main-component');
    expect(mainComponent).toBeInTheDocument();
  });
  // test('renders Auth component when user is not authenticated', () => {
  //   (useSelector as jest.Mock).mockReturnValue(false);
  //   render(
  //     <MemoryRouter>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   const authComponent = screen.getByTestId('auth-component');
  //   expect(authComponent).toBeInTheDocument();
  // });
});
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders app title', () => {
//   const { getByText } = render(<App />);
//   const titleElement = getByText(/Hello!/i);
//   expect(titleElement).toBeInTheDocument;
// });
