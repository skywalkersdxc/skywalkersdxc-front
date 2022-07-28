import { Container, Grid } from "@mui/material";
import { HomeButton, RoundedSelect } from "../../components/index";
import { StyledEngineProvider } from "@mui/material/styles";
import resultsPageStyles from "./ResultsPage.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import constants from "../../utils/constants";

function ResultsPage() {
  const formik = useFormik({
    validationSchema: Yup.object().shape({
      tripType: Yup.string().required("Trip type is required!"),
      passengers: Yup.number().required("Number of passengers is required!"),
    }),
    initialValues: {
      tripType: constants.tripType[0],
      passengers: 1,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth="xl" className={resultsPageStyles.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HomeButton />
          </Grid>
          <Grid item xs={5} md={4}>
            <RoundedSelect
              formik={formik}
              optionName="tripType"
              options={constants.tripType}
            />
          </Grid>
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
}

export default ResultsPage;
