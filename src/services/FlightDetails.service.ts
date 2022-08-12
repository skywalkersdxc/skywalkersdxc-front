import axios, {AxiosResponse} from "axios";

export interface IAirlineInfo {
    "type": string;
    "iataCode": string;
    "icaoCode": string;
    "businessName": string;
    "commonName": string;
}

export interface IAirlineRequestResponse {
    data: IAirlineInfo[] | string,
    meta?: {
        count: number,
        links: {
            self: string
        }
    };
}

export const getAirlineByCode = (codes: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/airlines?airlinesCodes=${codes}`)
        .then(handleResponse)
        .then(data => data as IAirlineRequestResponse);
}

const handleResponse = (response: AxiosResponse) => {
    const OK_STATUS = 200;

    if (response.status != OK_STATUS)
        return Promise.reject(response);

    return response.data;
}

