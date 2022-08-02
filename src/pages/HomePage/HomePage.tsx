import { Container, Grid, Typography } from "@mui/material";
import homePageSyles from "./HomePage.module.css";
import {
  RoundedSelect,
  HomeButton,
  DatePicker,
  AirportPicker,
} from "../../components/index";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StyledEngineProvider } from "@mui/material/styles";
import constants from "../../utils/constants";
import moment from "moment";

function HomePage() {
  const airports = ["MXN", "USA", "CAN", "ARG", "CHL", "BRZ"];
  const today = moment()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const futureLimit = today.clone().add(1, "year").toISOString();
  const formik = useFormik({
    validationSchema: Yup.object().shape({
      tripType: Yup.string().required("Trip type is required!"),
      passengers: Yup.number().required("Number of passengers is required!"),
      departureFlight: Yup.string().required("Departure flight is required!"),
      destinationFlight: Yup.string().required(
        "Destination flight is required!"
      ),
      departureDate: Yup.date()
        .required("Departure date is always required")
        .min(
          today.toISOString(),
          "Departure date cannot be before current date"
        )
        .max(futureLimit, "Dates cannnot be that far in advance."),
      returnDate: Yup.date().when("tripType", {
        is: constants.tripType[0],
        then: Yup.date()
          .min(
            Yup.ref("departureDate"),
            "Return date cannot be before departure date"
          )
          .max(futureLimit, "Dates cannnot be that far in advance."),
      }),
    }),
    initialValues: {
      tripType: constants.tripType[0],
      passengers: 1,
      departureDate: today.toISOString(),
      returnDate: today.add(3, "days").toISOString(),
    },
    onSubmit: (values) => {
      const departureDateFormatted = moment(values.departureDate).format(
        "MM/DD/YYYY"
      );
      const returnDateFormatted =
        values.tripType === constants.tripType[1]
          ? ""
          : moment(values.returnDate).format("MM/DD/YYYY");
      values.departureDate = departureDateFormatted;
      values.returnDate = returnDateFormatted;
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth="xl" className={homePageSyles.container}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} className={homePageSyles.gridContainer}>
            <Grid item xs={12}>
              <HomeButton isHomePage />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                The smartest flight search on the internet
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              container
              justifyContent="space-between"
              spacing={2}
            >
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
            <Grid
              container
              item
              spacing={2}
              xs={12}
              justifyContent="center"
              className={homePageSyles.inputsFlightsContainer}
            >
              <Grid item xs={12} sm={6} className={homePageSyles.flightPicker}>
                <AirportPicker
                  airports={airports}
                  flightType="departure"
                  formik={formik}
                  fieldName="departureFlight"
                />
              </Grid>
              <Grid item xs={12} sm={6} className={homePageSyles.flightPicker}>
                <AirportPicker
                  airports={airports}
                  flightType="destination"
                  formik={formik}
                  fieldName="destinationFlight"
                />
              </Grid>

              <Grid item xs={12} sm={6} className={homePageSyles.datePicker}>
                <DatePicker
                  display
                  formik={formik}
                  fieldName="departureDate"
                  value={formik.values.departureDate}
                  label="Departure Date"
                />
              </Grid>
              <Grid item xs={12} sm={6} className={homePageSyles.datePicker}>
                <DatePicker
                  display={formik.values.tripType === constants.tripType[0]}
                  formik={formik}
                  fieldName="returnDate"
                  value={formik.values.returnDate}
                  label="Return Date"
                />
              </Grid>
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
