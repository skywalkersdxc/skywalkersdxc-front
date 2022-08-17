import { render, screen } from "@testing-library/react";
import FlightDetailsModal from "./FlightDetailsModal";
import React from "react";
import FlightItineraryInfo from "./FlightItineraryInfo";
import {buildMapOfCodes} from "../../utils/utils";
import axios, {AxiosResponse} from "axios";

const dummyData: any = {
    "type": "flight-offer",
    "id": "1",
    "source": "GDS",
    "instantTicketingRequired": false,
    "nonHomogeneous": false,
    "oneWay": false,
    "lastTicketingDate": "2022-08-11",
    "numberOfBookableSeats": 7,
    "itineraries": [
        {
            "duration": "PT1H40M",
            "segments": [
                {
                    "departure": {
                        "iataCode": "MEX",
                        "terminal": "2",
                        "at": "2022-09-10T11:35:00"
                    },
                    "arrival": {
                        "iataCode": "MTY",
                        "terminal": "B",
                        "at": "2022-09-10T13:15:00"
                    },
                    "carrierCode": "AM",
                    "number": "920",
                    "aircraft": {
                        "code": "7M8"
                    },
                    "operating": {
                        "carrierCode": "AM"
                    },
                    "duration": "PT1H40M",
                    "id": "1",
                    "numberOfStops": 0,
                    "blacklistedInEU": false
                }
            ]
        },
        {
            "duration": "PT1H41M",
            "segments": [
                {
                    "departure": {
                        "iataCode": "MTY",
                        "terminal": "B",
                        "at": "2022-09-11T09:44:00"
                    },
                    "arrival": {
                        "iataCode": "MEX",
                        "terminal": "2",
                        "at": "2022-09-11T11:25:00"
                    },
                    "carrierCode": "AM",
                    "number": "917",
                    "aircraft": {
                        "code": "7M9"
                    },
                    "operating": {
                        "carrierCode": "AM"
                    },
                    "duration": "PT1H41M",
                    "id": "6",
                    "numberOfStops": 0,
                    "blacklistedInEU": false
                }
            ]
        }
    ],
    "price": {
        "currency": "MXN",
        "total": "4838.00",
        "base": "3091.00",
        "fees": [
            {
                "amount": "0.00",
                "type": "SUPPLIER"
            },
            {
                "amount": "0.00",
                "type": "TICKETING"
            }
        ],
        "grandTotal": "4838.00",
        "additionalServices": [
            {
                "amount": "1600",
                "type": "CHECKED_BAGS"
            }
        ]
    },
    "pricingOptions": {
        "fareType": [
            "PUBLISHED"
        ],
        "includedCheckedBagsOnly": false
    },
    "validatingAirlineCodes": [
        "AM"
    ],
    "travelerPricings": [
        {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
                "currency": "MXN",
                "total": "4838.00",
                "base": "3091.00"
            },
            "fareDetailsBySegment": [
                {
                    "segmentId": "1",
                    "cabin": "ECONOMY",
                    "fareBasis": "NNNB6AET",
                    "brandedFare": "BASICA",
                    "class": "V",
                    "includedCheckedBags": {
                        "quantity": 0
                    }
                },
                {
                    "segmentId": "6",
                    "cabin": "ECONOMY",
                    "fareBasis": "NNNB6AET",
                    "brandedFare": "BASICA",
                    "class": "V",
                    "includedCheckedBags": {
                        "quantity": 0
                    }
                }
            ]
        }
    ],
    passengers: 1
};

describe("FlightDetailsModal component", () => {
    test("Renders correctly", () => {
        const setOpen = jest.fn();

        render(<FlightDetailsModal flightOffer={dummyData} open={true} setOpen={setOpen}/>);
        expect(screen.getByTestId("modalFlightDetails")).toBeInTheDocument();

    });

    test("Not Renders FlightItineraryInfoComponent Modal", () => {
        const setOpen = jest.fn();

        render(<FlightDetailsModal flightOffer={dummyData} open={false} setOpen={setOpen}/>);
        expect(screen.queryByTestId('modalFlightDetails')).not.toBeInTheDocument();
    });

});

describe("FlightIteneraryInfo component", () => {
    test("Check passengers text", () => {
        render(<FlightItineraryInfo flightOffer={dummyData}/>);
        expect(screen.getByTestId("flightItInfoComp")).toHaveTextContent("Passengers: " + dummyData.passengers)
    });

    it("should return airline codes", async () => {
        const mAxiosResponse = {
            data: {
                "meta": {
                    "count": 2,
                    "links": {
                        "self": "https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=Y4,AM"
                    }
                },
                "data": [
                    {
                        "type": "airline",
                        "iataCode": "AM",
                        "icaoCode": "AMX",
                        "businessName": "AEROMEXICO",
                        "commonName": "AEROMEXICO"
                    },
                    {
                        "type": "airline",
                        "iataCode": "Y4",
                        "icaoCode": "VOI",
                        "businessName": "VOLARIS",
                        "commonName": "VOLARIS"
                    }
                ]
            } ,
        } as AxiosResponse;

        jest.spyOn(axios, 'get').mockResolvedValueOnce(mAxiosResponse);
        render(<FlightItineraryInfo flightOffer={dummyData}/>);
        expect( await screen.findByText('1h 41m')).toBeInTheDocument();
    });

    it('should build a map of code its name',  () => {
        const codes = [
            {
                "type": "airline",
                "iataCode": "AM",
                "icaoCode": "AMX",
                "businessName": "AEROMEXICO",
                "commonName": "AEROMEXICO"
            },
            {
                "type": "airline",
                "iataCode": "Y4",
                "icaoCode": "VOI",
                "businessName": "VOLARIS",
                "commonName": "VOLARIS"
            }
        ];

        const result = buildMapOfCodes(codes);

        expect(result.has("AM")).toEqual(true);
    });
});
