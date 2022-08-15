import React, {useEffect, useState} from "react";
import {FlightResultsProps} from "../../pages/HomePage/interfaces";
import {Box, Grid, LinearProgress, Typography} from "@mui/material";
import {airlineFailoverLogo} from "../FlightCard/FlightInfoComponent";
import flightCardStyles from "../FlightCard/FlightCard.module.css";
import {convertDate, timeTravelDiff} from "../../utils/utils";
import moment from "moment";
import {getAirlineByCodes, IAirlineInfo} from "../../services/FlightDetails.service";

type FlightItineraryInfoProps = {
    flightOffer: FlightResultsProps,
};

const FlightItineraryInfo: React.FC<FlightItineraryInfoProps> = ({flightOffer}: FlightItineraryInfoProps) => {
    const [airlines, setAirlines] = useState<Map<string, string> | null>(null);
    const {passengers} = flightOffer;
    const ItineraryTitle = ["OUTBOUND", "RETURN"];

    const involvedCarrierCodes: string[] = flightOffer.itineraries
        .map((itinerary) => itinerary.segments[0].carrierCode)
    const involvedCarrierCodesDistinct = Array.from(new Set(involvedCarrierCodes)).join(',');

    useEffect(()=> {
        getAirlineByCodes(involvedCarrierCodesDistinct)
            .then(({data}) =>
                setAirlines(buildMapOfCodes(data))
            ).catch((reason) => console.log(reason))
    }, []);

    const Elements = flightOffer.itineraries.map((itinerary, index) => {
        const segment = itinerary.segments[0];
        return (
            <Grid container flexDirection={"column"} key={index}>
                {/* title */}
                <Grid container>
                    <Box width={'100%'} sx={{border: '1px solid #d6dfe3', backgroundColor: "#f6fbff"}}>
                        <Typography sx={{color: "#8399a9", p: "0.5em"}} > {ItineraryTitle[index] + " FLIGHT"} </Typography>
                    </Box>
                </Grid>

                {/* card info */}
                <Grid item container direction={"row"} marginTop={1}>
                    <Grid xs={2} item container marginTop={1} alignItems={"start"} justifyContent={"flex-end"}>
                        <img alt="airlineIcon" src={airlineFailoverLogo} width={35} style={{marginRight: "1em"}} />
                    </Grid>
                    <Grid item xs={10}>
                        <Grid item container xs={12} direction={"column"}>
                            <Grid item xs={1}>
                                <Typography variant={"body2"} className={flightCardStyles.x}>
                                    {airlines?.get(segment.carrierCode)}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant={"body2"} gutterBottom>
                                    {timeTravelDiff(segment.departure.at, segment.arrival.at)}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Box>
                                    <LinearProgress variant="determinate" value={90} className={flightCardStyles.flightProgress}/>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant={"body2"} gutterBottom>
                                    {moment(segment.departure.at).format('MMM DD,ddd')}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant={"body2"} gutterBottom>
                                    {convertDate(segment.departure.at)} - {convertDate(segment.arrival.at)}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant={"body2"} gutterBottom>
                                    {segment.departure.iataCode} → {segment.arrival.iataCode}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant={"body2"} gutterBottom>
                                    Passengers: {passengers}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    });

    return (
        <Grid container data-testid={"flightItInfoComp"}>
            {Elements}
        </Grid>
    );
}

export const buildMapOfCodes = (data: IAirlineInfo[]) => {
    return new Map(data.map((airline) => [airline.iataCode, airline.businessName]))
}

export default FlightItineraryInfo;
