import React from "react";
import {FlightResultsProps} from "../../pages/HomePage/interfaces";
import {Box, Grid, LinearProgress, Typography} from "@mui/material";
import {aaImgUrlDummy} from "../FlightCard/FlightInfoComponent";
import flightCardStyles from "../FlightCard/FlightCard.module.css";
import {convertDate, timeTravelDiff} from "../../utils/utils";
import moment from "moment";

type FlightItinerarieInfoProps = {
    flightOffer: FlightResultsProps,
    title?: string,
};

const FlightItineraryInfo: React.FC<FlightItinerarieInfoProps> = ({flightOffer, title}: FlightItinerarieInfoProps) => {
    const IteneraryTitle = ["OUTBOUND", "RETURN"];

    const Elements = flightOffer.itineraries.map((value, index) => {
        return (
            <Grid container flexDirection={"column"}>
                {/* title */}
                <Grid container>
                    <Box width={'100%'} sx={{border: '1px solid #d6dfe3', backgroundColor: "#f6fbff"}}>
                        <Typography sx={{color: "#8399a9", p: "0.5em"}} > {IteneraryTitle[index] + " FLIGHT"} </Typography>
                    </Box>
                </Grid>

                {/* card info */}
                <Grid item container direction={"row"} marginTop={1}>
                    <Grid xs={2} item container marginTop={1} alignItems={"start"} justifyContent={"flex-end"}>
                        <img alt="airlineIcon" src={aaImgUrlDummy} width={35} style={{marginRight: "1em"}} />
                    </Grid>
                    <Grid xs={10}>
                        <Grid item xs={12} direction={"column"}>
                            <Grid item xs={1}>
                                <Typography variant={"body1"}>
                                    aereolinea
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

    const segment = flightOffer.itineraries[0].segments[0];
    const {passengers} = flightOffer;
    return (
        <Grid container flexDirection={"column"}>
            {/* title */}
            <Grid container>
                <Box width={'100%'} sx={{border: '1px solid #d6dfe3', backgroundColor: "#f6fbff"}}>
                    <Typography sx={{color: "#8399a9", p: "0.5em"}} > {title ? title : " FLIGHT"} </Typography>
                </Box>
            </Grid>

            {/* card info */}
            <Grid item container direction={"row"} marginTop={1}>
                <Grid xs={2} item container marginTop={1} alignItems={"start"} justifyContent={"flex-end"}>
                    <img alt="airlineIcon" src={aaImgUrlDummy} width={35} style={{marginRight: "1em"}} />
                </Grid>
                <Grid xs={10}>
                    <Grid item xs={12} direction={"column"}>
                        <Grid item xs={1}>
                            <Typography variant={"body1"}>
                                aereolinea
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
}

export default FlightItineraryInfo;
