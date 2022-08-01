import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

const mockedNavigator = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedNavigator,
}));

describe('HomePage Component', () => {
    it('Renders the home page Component', async () => {
        render(<HomePage />);
        expect(await screen.findByText(/The smartest flight search on the internet/)).toBeInTheDocument();
    });
});