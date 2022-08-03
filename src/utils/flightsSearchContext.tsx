import React, { createContext, useContext, useState } from "react";
import { IFlightOffers } from "../intefaces/flights";

interface IFlightsSearchContext {
    flightOffers: IFlightOffers
    setFlightOffers: React.Dispatch<React.SetStateAction<IFlightOffers>>
}

const Context =  createContext<IFlightsSearchContext>({} as IFlightsSearchContext);

interface ContextProps {
    children: JSX.Element | JSX.Element[];
}

const FlightOffersProvider : React.FC<ContextProps> = ( {children} ) => {
const [flightOffers, setFlightOffers] = useState<IFlightOffers>({} as IFlightOffers);
    return (
        <Context.Provider value={{ flightOffers, setFlightOffers }}>
            {children}
        </Context.Provider>    
    )
}

export default FlightOffersProvider;
export const useFlightOffers = () => useContext(Context);