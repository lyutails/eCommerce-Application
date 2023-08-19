import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfilePage from './Profile';
import { setAuthStatus } from '../../store/reducers/userReducer';
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
describe('ProfilePage component', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockClear();
    (useDispatch as jest.Mock).mockClear();
  });
  // test('renders profile component with correct name', () => {
  //   const mockDispatch = 'c7551869-f082-4b68-9215-1bb6e147a975';
  //   (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  //   render(
  //     <MemoryRouter>
  //       <ProfilePage />
  //     </MemoryRouter>
  //   );
  //   const profileComponent = screen.getByTestId('profile-component');
  //   expect(profileComponent).toBeInTheDocument;
  //   const helloText = screen.getByText(/Hello, Лфенф ывапаувас/i);
  //   expect(helloText).toBeInTheDocument;
  // });
  test('calls dispatch with correct action on logout', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch).mockReturnThis;
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText(/log out/i);
    expect(logoutButton).toBeInTheDocument;
    fireEvent.click(logoutButton);
    expect(mockDispatch).toHaveBeenCalledWith(setAuthStatus(false));
  });
});