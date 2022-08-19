import { Container, Grid } from "@mui/material";
import { HomeButton } from "../../components/index";
import { StyledEngineProvider } from "@mui/material/styles";
import resultsPageStyles from "./ResultsPage.module.css";
import { IFlightOffers } from "../../intefaces/flights";
import { Navigate } from "react-router-dom"

import { useFlightOffers } from "../../utils/flightsSearchContext";


function ResultsPage(data: IFlightOffers) {
  return (
      <StyledEngineProvider injectFirst>
        <Container maxWidth="xl" className={resultsPageStyles.container}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <HomeButton />
            </Grid>
            <p>{`Found ${data.meta.count} flight offers`}</p>
          </Grid>
        </Container>
      </StyledEngineProvider>
  );
}

function Redirect(){
  return (
    <Navigate
      to={"/"}
    />
  )
}


function ResultsPageProxy(){
  const { flightOffers } = useFlightOffers();
  console.log("RESULTS PAGE", flightOffers)
  if(!flightOffers.data)
    return Redirect();
  
  return ResultsPage(flightOffers);
}

export default ResultsPageProxy;
