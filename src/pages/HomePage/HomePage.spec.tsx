import { fireEvent, render, screen } from '@testing-library/react';
import { IFlightOffers } from '../../intefaces/flights';
import { Context } from '../../utils/flightsSearchContext';
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

describe('HomeButton Component in HomePage', () => {
    it('reset context values', async () => {
        const flightOffers = {} as IFlightOffers;
        const setFlightOffers = jest.fn();
        render(
            <Context.Provider value={{ flightOffers, setFlightOffers }}>
                <HomePage/>
            </Context.Provider>
            );
        const homeButton = screen.getByTestId("home-button");
        fireEvent.click(homeButton);
        expect(setFlightOffers).toBeCalled();
    });
});

