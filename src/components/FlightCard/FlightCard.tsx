import { FlightResultsProps,  } from "../../pages/HomePage/interfaces";
import { Button, Grid } from "@mui/material";
import flightCardStyles from "./FlightCard.module.css"
import FlightInfoComponent from "./FlightInfoComponent";

const FlightCard: React.FC<{flightResults: FlightResultsProps}> = ({flightResults} : {flightResults: FlightResultsProps}) => {
    let randomString = (Math.random() + 1).toString(36).substring(7);
   return (
    <Grid data-testid="flightCard" key={randomString + flightResults.id} container item className={flightCardStyles.containerCard} xs={12}>
        {flightResults.itineraries.map((item) => <FlightInfoComponent key={randomString + item.segments[0].arrival.at + flightResults.id} itineraries={item.segments[0]}/>)}
        <Grid item xs={12} container flexDirection="row" className={flightCardStyles.amountContainer}>
            <Grid item xs={12}>
                <hr className={flightCardStyles.dividerAmount}/>
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end">
                <Grid item xs={4} container justifyContent="flex-end">
                    <Button variant="outlined" className={flightCardStyles.amountButton}>${flightResults.price.total}</Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
   )
}

export default FlightCard

