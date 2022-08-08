export interface IFlightSearchStatus {
    isLoading: boolean,
    result?: {
        error: {
            message: string
        },
    }
}

export interface IHomePageFormData { 
    tripType: string,
    departureDate: string,
    passengers: number,
    returnDate: string,
    departureFlight: string,
    destinationFlight: string
}

export interface FlightResultsProps {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: any[];
    price: any;
    pricingOptions: any;
    validatingAirlineCodes: string[];
    travelerPricings: any[];
}

export interface ItinerariesProps {
    departure: any;
    arrival: any;
    carrierCode: string;
    number: string;
    aircraft: any;
    operating: any;
    duration: string;
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
}