import axios, { AxiosError } from "axios";
import { IFlightOffers, IFlightSearchQuery } from "../intefaces/flights";

const apiBaseUrl = process.env.REACT_APP_API_URL;

export async function searchFlight(query: IFlightSearchQuery) : Promise<IFlightOffers> {
    const flightOffersEndpoint = `${apiBaseUrl}/flight-offers`;
    const requestConfig = {
        method: "post", 
        url: flightOffersEndpoint,
        data: query
    }
    
    try{
        const result = await axios(requestConfig);
        return Promise.resolve(result.data as IFlightOffers);
    }catch(exception){
        const requestError = exception as AxiosError;
        return Promise.reject(requestError.message);
    }
} 