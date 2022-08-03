import { Container, Grid } from "@mui/material";
import { HomeButton } from "../../components/index";
import { StyledEngineProvider } from "@mui/material/styles";
import resultsPageStyles from "./ResultsPage.module.css";
import { IFlightOffers } from "../../intefaces/flights";
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";

interface IResultsPageLocation {
  location?: {
    state?: IFlightOffers
  }
}

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {    
    if(!location.state){
      navigate(-1);
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth="xl" className={resultsPageStyles.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HomeButton />
          </Grid>
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
}

export default ResultsPage;
