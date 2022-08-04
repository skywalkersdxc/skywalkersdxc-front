import axios, { AxiosError } from "axios";
import { IFlightOffers, IFlightSearchQuery } from "../intefaces/flights";
import moment from "moment";
import constants from "../utils/constants";
import { IHomePageFormData } from "../pages/HomePage/interfaces";

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
        const flightOffers = result.data;
        if(!flightOffers.meta.count){
            return Promise.reject("No flights found for this criteria.");
        } 
        return Promise.resolve(result.data as IFlightOffers);
    }catch(exception){
        const requestError = exception as AxiosError;
        return Promise.reject(requestError.message);
    }
} 

export function transformFormData(formData: IHomePageFormData) : IFlightSearchQuery{
    const departureDateFormatted = moment(formData.departureDate).format("YYYY-MM-DD");
    const returnDateFormatted = formData.tripType === constants.tripType[1] 
                                        ? undefined
                                        : moment(formData.returnDate).format("YYYY-MM-DD");
    return {
        originLocationCode: formData.departureFlight,
        destinationLocationCode: formData.destinationFlight,
        departureDate: departureDateFormatted,
        returnDate: returnDateFormatted,
        adults: formData.passengers,
        children: 0,
        infants: 0,
        nonStop: true,
        currencyCode: "MXN",
    }
}