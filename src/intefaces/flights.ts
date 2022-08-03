export interface Departure {
    iataCode: string;
    terminal?: string;
    at?: string | Date;
}

export interface Arrival {
    iataCode: string;
    terminal?: string;
    at?: string | Date;
}

export interface Aircraft {
    code: string;
}

export interface Operating {
    carrierCode: string;
}

export interface Segment {
    departure: Departure;
    arrival: Arrival;
    carrierCode: string;
    number: string;
    aircraft: Aircraft;
    operating: Operating;
    duration: string;
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
}

export interface Itinerary {
    duration: string;
    segments: Segment[];
}

export interface Fee {
    amount: string;
    type: string;
}

export interface AdditionalService {
    amount: string;
    type: string;
}

export interface Price {
    currency: string;
    total: string;
    base: string;
    fees?: Fee[];
    grandTotal?: string;
    additionalServices?: AdditionalService[];
}

export interface PricingOptions {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
}

export interface IncludedCheckedBags {
    quantity: number;
}

export interface FareDetailsBySegment {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    brandedFare?: string;
    class: string;
    includedCheckedBags: IncludedCheckedBags;
}

export interface TravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: Price;
    fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FlightProps {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: Itinerary[];
    price: Price;
    pricingOptions: PricingOptions;
    validatingAirlineCodes: string[];
    travelerPricings: TravelerPricing[];
}

export interface IFlightSearchQuery {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string | null;
    adults: number;
    children: number;
    infants: number;
    travelClass?: string | null;
    nonStop: boolean;
    currencyCode: string;
}

export interface IFlightOffers {
    data: FlightProps[];
    dictionaries: object;
    meta: object;
}

export interface IFlightSearchStatus {
    isLoading: boolean,
    result?: {
        error?: {
            message: string
        },
    }
}