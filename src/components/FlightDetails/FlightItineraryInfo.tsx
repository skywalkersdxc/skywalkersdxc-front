import React from "react";
import {FlightResultsProps} from "../../pages/HomePage/interfaces";
import {Box, Grid, Typography} from "@mui/material";

type FlightItinerarieInfoProps = {
    flightOffer: FlightResultsProps,
};

const FlightItineraryInfo: React.FC<FlightItinerarieInfoProps> = (flightOffer: FlightItinerarieInfoProps) => {
    const flightWay = "OUTBOUND FLIGHT";
    return (
        <Grid container xs={12} direction={"column"}>
            <Grid item container justifyContent={"center"} xs={2} style={{backgroundColor: "aqua"}}>
                {/* title */}
                <Box justifyContent={"center"} width={'100%'} sx={{ p: 2, border: '1px groove #f6fbff', backgroundColor: "#f6fbff"}}>
                    <Typography sx={{ flexGrow: 1, color: "#8399a9"}} >
                        {flightWay}
                    </Typography>
                </Box>
            </Grid>
            {/* card info */}
            <Grid item xs={10} style={{backgroundColor: "violet"}}>
                Hola
            </Grid>
        </Grid>
    );
}

export default FlightItineraryInfo;
