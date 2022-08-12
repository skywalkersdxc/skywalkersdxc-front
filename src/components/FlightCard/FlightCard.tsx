import React from "react";
import { FlightResultsProps,  } from "../../pages/HomePage/interfaces";
import {Button, Grid, Typography} from "@mui/material";
import flightCardStyles from "./FlightCard.module.css"
import FlightInfoComponent from "./FlightInfoComponent";
import FlightDetailsModal from "../FlightDetails/FlightDetailsModal";

type FlightCardProps = {
    flightResults: FlightResultsProps,
    showMode?: boolean
};

/**
 *
 * @param flightResults
 * @param showMode - if true, the component doesn't show the price nor the details modal, if false it shows the
 * passengers number data.
 * @constructor
 */
const FlightCard: React.FC<FlightCardProps> = ({flightResults, showMode} : FlightCardProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    let randomString = (Math.random() + 1).toString(36).substring(7);
   return (
       <Grid data-testid="flightCard" key={randomString + flightResults.id} container item className={flightCardStyles.containerCard} xs={12}>
        {flightResults.itineraries.map((item) => <FlightInfoComponent key={item.duration} itineraries={item.segments[0]}/>)}
        {
            !showMode ?
                <Grid item xs={12} container flexDirection="row" className={flightCardStyles.amountContainer}>
                    <FlightDetailsModal flightOffer={flightResults} open={open} setOpen={setOpen}/>
                    <Grid item xs={12}>
                        <hr className={flightCardStyles.dividerAmount}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-end">
                        <Grid item xs={4} container justifyContent="flex-end">
                            <Button onClick={handleOpen} variant="outlined" className={flightCardStyles.amountButton}>${flightResults.price.total}</Button>
                        </Grid>
                    </Grid>
                </Grid>
                :
                <Grid container item xs={12}>
                    <Grid item container xs={12} alignItems={"center"}>
                        <Typography id="modal-modal-description">
                            Passengers: {flightResults.passengers}
                        </Typography>
                    </Grid>
                </Grid>
        }
    </Grid>
   )
}

export default FlightCard

