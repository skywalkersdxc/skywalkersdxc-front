import { convertDate, timeTravelDiff } from "./utils"

describe("Convert Date", () => {
    test("Correct date format", () => {
        const flightDayFormat = "2022-08-05T15:34:32"
        const transformDate = convertDate(flightDayFormat)

        expect(transformDate).toContain("3:34 am")
        expect(transformDate).toEqual("3:34 am")
    })

    test("Bad date format", () => {
        const flightDayFormat = "asdfasdfasdf"
        const transformDate = convertDate(flightDayFormat)

        expect(transformDate).toContain("Invalid Date")
        expect(transformDate).toEqual("Invalid Date")
    })
})

describe("Travel Date Difference", () => {
    test("Correct date format", () => {
        const flightArrivalFormat = "2022-11-01T16:50:00"
        const flightDepartureFormat = "2022-11-01T11:35:00"
        const dateDifference = timeTravelDiff(flightDepartureFormat, flightArrivalFormat)
        
        expect(dateDifference).toContain("5h 15m")
        expect(dateDifference).toEqual("5h 15m")
    })

    test("Bad date format", () => {
        const flightArrivalFormat = "2022-11-01T16:50:00"
        const flightDepartureFormat = "2022-11-01T11:35:00"
        const badFormat = "asdfasdfasdf"
        const dateDifference = timeTravelDiff(badFormat, flightArrivalFormat)
        const dateDifference2 = timeTravelDiff(flightDepartureFormat, badFormat)
        const dateDifference3 = timeTravelDiff(badFormat, badFormat)

        expect(dateDifference).toContain("Invalid Date")
        expect(dateDifference).toEqual("Invalid Date")

        expect(dateDifference2).toContain("Invalid Date")
        expect(dateDifference2).toEqual("Invalid Date")

        expect(dateDifference3).toContain("Invalid Date")
        expect(dateDifference3).toEqual("Invalid Date")
    })
})

export {}