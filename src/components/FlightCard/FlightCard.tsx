import { FlightResultsProps, ItinerariesProps } from "../../pages/HomePage/interfaces";
import { Button, Typography, Box, LinearProgress, Grid } from "@mui/material";
import { convertDate, timeTravelDiff } from "../../utils/utils"
import flightCardStyles from "./FlightCard.module.css"

const aaImgUrlDummy = "https://www.aa.com/content/images/homepage/mobile-hero/en_US/Airplane-1.png"

export const FlightInfoComponent: React.FC<{itineraries: ItinerariesProps}> = ({itineraries}: {itineraries: ItinerariesProps}) => {
    const {departure, arrival} = itineraries
    return (
        <Grid item xs={12} container data-testid="flightInfoComponent">
            <Grid item xs={2} container justifyContent="center" alignItems="center">
                <img alt="airlineIcon" src={aaImgUrlDummy} width={40}/>
            </Grid>
            <Grid item xs={10} container className={flightCardStyles.originDestiny}>
                <Grid item xs={12} container justifyContent="space-between">
                    <Typography variant={"body1"}>{convertDate(departure.at)}</Typography>
                    <Typography variant={"body1"}>{convertDate(arrival.at)}</Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="space-between">
                    <Typography variant={"body1"}>{departure.iataCode}</Typography>
                    <Typography variant={"body1"}>
                        {timeTravelDiff(departure.at, arrival.at)}
                    </Typography>
                    <Typography variant={"body1"}>{arrival.iataCode}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress variant="determinate" value={100} className={flightCardStyles.flightProgress}/>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

const FlightCard: React.FC<{flightResults: FlightResultsProps}> = ({flightResults} : {flightResults: FlightResultsProps}) => {
   return (
    <Grid data-testid="flightCard" key={flightResults.id} container item className={flightCardStyles.containerCard} xs={12}>
        {flightResults.itineraries.map((item) => <FlightInfoComponent key={item.duration} itineraries={item.segments[0]}/>)}
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

