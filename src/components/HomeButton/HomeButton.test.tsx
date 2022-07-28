import { render, screen, fireEvent } from '@testing-library/react';
import HomeButton from './HomeButton';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const mockedNavigator = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigator,
}));

describe('HomeButton component', () => {
  test('renders correctly', () => {
    render(<HomeButton />);

    expect(screen.getByTestId('home-button')).toBeInTheDocument();
  });

  test('do nothing when isHomePage props is truthy', () => {
    const history = createMemoryHistory();
    render(
      <Router location={'/'} navigator={history}>
        <HomeButton isHomePage />
      </Router>
    );

    fireEvent.click(screen.getByTestId('home-button'));
    expect(history.location.pathname).toBe('/');
  });

  test('navigates to /', () => {
    render(
      <MemoryRouter initialEntries={['/results']}>
        <HomeButton />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('home-button'));
    expect(mockedNavigator).toHaveBeenCalledWith('/');
  });
});
