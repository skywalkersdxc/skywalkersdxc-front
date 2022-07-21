import { Container, Grid, Typography } from '@mui/material';
import homePageSyles from "./HomePage.module.css"

function HomePage() {
  return (
    <Container maxWidth="xl" className={homePageSyles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          Icon
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            The smartest flight search on the internet
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="space-around">
          <Grid item xs={6}>
            Trip type
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            Passengers
          </Grid>
        </Grid>
        <Grid item xs={12}>
          Search Form
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          Button
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;