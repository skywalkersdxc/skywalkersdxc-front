import { Container, Grid, Typography, SelectChangeEvent } from '@mui/material';
import homePageSyles from "./HomePage.module.css"
import {useState} from "react"
import RoundSelect from "../../components/roundSelect"

function HomePage() {
  const [flightInfo, setFlightInfo] = useState<{
    tripType: string,
  }>({
    tripType: "Round Trip",
  });

  const handleChange = (event: SelectChangeEvent, optionName: string ) => {
    setFlightInfo({
      ...flightInfo,
      [optionName]: event.target.value as string
    })
  };
  
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
        <Grid item xs={12} container justifyContent="space-between" spacing={2}>
          <Grid item xs={5} md={2}>
            <RoundSelect 
              value={flightInfo.tripType}
              optionName="tripType"
              handleChange={handleChange}
              arr={["Round Trip", "One Way"]}
            />
          </Grid>
          <Grid item xs={6} md={2}>
          passenger
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