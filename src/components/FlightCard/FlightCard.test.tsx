import { render, screen } from "@testing-library/react";
import FlightCard from "./FlightCard"
import FlightInfoComponent from "./FlightInfoComponent"
import { convertDate, timeTravelDiff } from "../../utils/utils"

const dummyData = {
      "type": "flight-offer",
      "id": "1",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2022-11-01",
      "numberOfBookableSeats": 9,
      "itineraries": [
        {
            "duration": "PT14H15M",
            "segments": [
              {
                "departure": {
                  "iataCode": "SYD",
                  "terminal": "1",
                  "at": "2022-11-01T11:35:00"
                },
                "arrival": {
                  "iataCode": "MNL",
                  "terminal": "2",
                  "at": "2022-11-01T16:50:00"
                },
                "carrierCode": "PR",
                "number": "212",
                "aircraft": {
                  "code": "333"
                },
                "operating": {
                  "carrierCode": "PR"
                },
                "duration": "PT8H15M",
                "id": "1",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          }
      ],
      "price": {
        "currency": "EUR",
        "total": "1279.54",
        "base": "844.00",
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
        "grandTotal": "1279.54"
      },
      "pricingOptions": {},
      "validatingAirlineCodes": [
        "PR"
      ],
      "travelerPricings": []
}
  
describe("FlightCard component", () => {
    test("Renders correctly", () => {
      render(<FlightCard flightResults={dummyData}/>);
      expect(screen.getByTestId("flightCard")).toBeInTheDocument()
      expect(screen.getByRole("button")).toHaveTextContent("$1279.54")
    });
});

describe("FlightInfo component", () => {
    test("Renders correctly", () => {
      render(<FlightInfoComponent itineraries={dummyData.itineraries[0].segments[0]}/>);
      
      expect(screen.getByTestId("flightInfoComponent")).toBeInTheDocument()
    });

    test("Check iatCode", () => {
        render(<FlightInfoComponent itineraries={dummyData.itineraries[0].segments[0]}/>);
        const testArrival = dummyData.itineraries[0].segments[0].arrival
        const testDeparture = dummyData.itineraries[0].segments[0].departure

        expect(screen.getByTestId("flightInfoComponent")).toHaveTextContent(testDeparture.iataCode)
        expect(screen.getByTestId("flightInfoComponent")).toHaveTextContent(testArrival.iataCode)
    });

    test("Check date transform", () => {
        render(<FlightInfoComponent itineraries={dummyData.itineraries[0].segments[0]}/>);
        const testArrival = dummyData.itineraries[0].segments[0].arrival
        const testDeparture = dummyData.itineraries[0].segments[0].departure

        expect(screen.getByTestId("flightInfoComponent")).toHaveTextContent(convertDate(testDeparture.at))
        expect(screen.getByTestId("flightInfoComponent")).toHaveTextContent(convertDate(testArrival.at))
        expect(screen.getByTestId("flightInfoComponent")).toHaveTextContent(timeTravelDiff(testDeparture.at, testArrival.at))
    });
});