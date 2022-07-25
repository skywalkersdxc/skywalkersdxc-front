import { Container, Grid } from "@mui/material";
import { HomeButton } from "../../components/index";
import { StyledEngineProvider } from "@mui/material/styles";
import resultsPageStyles from "./ResultsPage.module.css";

function ResultsPage() {
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
