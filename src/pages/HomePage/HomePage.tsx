import { Container, Grid, Typography } from '@mui/material';
import homePageSyles from "./HomePage.module.css"
import RoundedSelect from "../../components/roundedSelect"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StyledEngineProvider } from '@mui/material/styles';
import constants from "../../utils/constants"

function HomePage() {
  const formik = useFormik({
    validationSchema: Yup.object().shape({
      tripType: Yup.string().required("Trip type is required!"),
      passengers: Yup.number().required("Number of passengers is required!")
    }),
    initialValues: {
      tripType: constants.tripType[0],
      passengers: 1
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth="xl" className={homePageSyles.container}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              Icon
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                The smartest flight search on the internet
              </Typography>
            </Grid>
            <Grid item md={8} container justifyContent="space-between" spacing={2}>
              <Grid item xs={5} md={4}>
                <RoundedSelect
                  formik={formik}
                  optionName="tripType"
                  options={constants.tripType}
                />
              </Grid>
              <Grid item xs={5} md={4}>
                <RoundedSelect
                    formik={formik}
                    optionName="passengers"
                    options={constants.passengers}
                    iconName="groupIcon"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              Search Form
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <button type="submit">Search</button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </StyledEngineProvider>
  );
}

export default HomePage;