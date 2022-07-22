import { Container, Grid, Typography } from '@mui/material';
import homePageSyles from "./HomePage.module.css"
import RoundSelect from "../../components/roundSelect"
import { useFormik } from 'formik';
import * as Yup from 'yup';

function HomePage() {
  const formik = useFormik({
    validationSchema: Yup.object().shape({
      tripType: Yup.string().required("Trip type is required!")
    }),
    initialValues: {
      tripType: 'Round Trip'
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  return (
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
          <Grid item xs={12} container justifyContent="space-between" spacing={2}>
            <Grid item xs={5} md={2}>
              <RoundSelect
                formik={formik}
                optionName="tripType"
                options={["Round Trip", "One Way"]}
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
            <button type="submit">Search</button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default HomePage;