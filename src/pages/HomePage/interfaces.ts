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