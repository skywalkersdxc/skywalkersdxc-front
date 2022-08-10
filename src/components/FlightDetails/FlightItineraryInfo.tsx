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

    const Elements = flightOffer.itineraries.map((value, index) => true);

    const segment = flightOffer.itineraries[0].segments[0];
    const {passengers} = flightOffer;
    return (
        <Grid container xs={12} direction={"column"}>
            <Grid item container justifyContent={"center"} xs={2} style={{backgroundColor: "aqua"}}>
                {/* title */}
                <Box justifyContent={"center"} width={'100%'} sx={{ p: 2, border: '1px solid #d6dfe3', backgroundColor: "#f6fbff"}}>
                    <Typography sx={{ flexGrow: 1, color: "#8399a9"}} >
                        {title ? title : " FLIGHT"}
                    </Typography>
                </Box>
            </Grid>
            {/* card info */}
            <Grid item container xs={10} style={{backgroundColor: "rgba(166,176,185,0.98)", marginTop: "3px"}}>
                <Grid item container xs={12} direction={"row"} alignItems={"stretch"}>
                    <Grid item container xs={2} justifyContent="center" alignItems="start" marginTop={1}>
                        <img alt="airlineIcon" src={aaImgUrlDummy} width={35}/>
                    </Grid>
                    <Grid item container xs={10}>
                        <Grid item container xs={12} direction={"column"} style={{backgroundColor: "blueviolet"}}>
                            <Grid item xs={1}>
                                <Typography variant={"body1"}>
                                    aereolinea
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant={"body2"}>
                                    {timeTravelDiff(segment.departure.at, segment.arrival.at)}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Box>
                                    <LinearProgress variant="determinate" value={90} className={flightCardStyles.flightProgress}/>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant={"body2"}>
                                    {moment(segment.departure.at).format('MMM DD,ddd')}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant={"body2"}>
                                    {convertDate(segment.departure.at)} - {convertDate(segment.arrival.at)}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                ciudades
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant={"body2"}>
                                    Passengers: {passengers}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default FlightItineraryInfo;
