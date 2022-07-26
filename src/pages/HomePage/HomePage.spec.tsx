import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage Component', () => {
    it('Renders the home page Component', async () => {
        render(<HomePage />);
        expect(await screen.findByText(/The smartest flight search on the internet/)).toBeInTheDocument();
    });
});