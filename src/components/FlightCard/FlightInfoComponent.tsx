import { ItinerariesProps } from "../../pages/HomePage/interfaces";
import { Typography, Box, LinearProgress, Grid } from "@mui/material";
import { convertDate, timeTravelDiff } from "../../utils/utils"
import flightCardStyles from "./FlightCard.module.css"

const airlineFailoverLogo = "https://upload.wikimedia.org/wikipedia/commons/2/23/Flugzeug_mit_Nase_nach_oben.svg";

const FlightInfoComponent: React.FC<{itineraries: ItinerariesProps}> = ({itineraries}: {itineraries: ItinerariesProps}) => {
    const {departure, arrival, carrierCode} = itineraries;
    const svgLogo = `https://airlinecodes.info/airlinelogos/${carrierCode}.svg`;
    return (
        <Grid item xs={12} container data-testid="flightInfoComponent">
            <Grid item xs={2} container justifyContent="center" alignItems="center">
                <img 
                    width="100%"
                    alt="airlineIcon" 
                    src={svgLogo}
                    onError={(evt: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        evt.currentTarget.src = airlineFailoverLogo
                    }}
                    className={flightCardStyles.airlineLogo}
                />
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

export default FlightInfoComponent