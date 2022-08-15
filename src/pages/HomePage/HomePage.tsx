import { Alert, Container, Grid, Typography } from "@mui/material";
import homePageStyles from "./HomePage.module.css";
import {
  RoundedSelect,
  HomeButton,
  DatePicker,
  AirportPicker,
  SubmitButton,
  FlightCard
} from "../../components/index";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StyledEngineProvider } from "@mui/material/styles";
import constants from "../../utils/constants";
import moment from "moment";
import { useState } from "react";
import { searchFlight, transformFormData } from "../../logic/searchFlight";
import { useFlightOffers } from "../../utils/flightsSearchContext";
import { IFlightSearchStatus, IHomePageFormData, FlightResultsProps } from "./interfaces";
import { IFlightOffers } from "../../intefaces/flights";
import {CompactSearchForm} from "../../components/CompactSearchForm/CompactSearchForm";

function HomePage() {
  const today = moment()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const futureLimit = today.clone().add(1, "year").toISOString();

  const [flightSearchStatus, setFlightSearchStatus] = useState<IFlightSearchStatus>({isLoading: false});
  const { flightOffers, setFlightOffers } = useFlightOffers();

  const formik = useFormik<IHomePageFormData>({
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      tripType: Yup.string().required("Trip type is required!"),
      passengers: Yup.number().required("Number of passengers is required!"),
      departureFlight: Yup.string().required("Departure flight is required!"),
      destinationFlight: Yup.string().required("Destination flight is required!"),
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
      departureFlight: "LAX",
      destinationFlight: "",
    },
    onSubmit: async (values) => {
      setFlightSearchStatus({isLoading: true});
      const query = transformFormData(values);
      try{
        const result = await searchFlight(query);
        setFlightSearchStatus({ isLoading: false });
        setFlightOffers(result);
      }catch(error){
        setFlightOffers({} as IFlightOffers);
        setFlightSearchStatus({
          isLoading: false,
          result: {
            error: { message: error as string }
          }
        });
      }
    },
    onReset: () => {
      setFlightOffers({} as IFlightOffers);
      setFlightSearchStatus({ isLoading: false });
    }
  });

  const onClickHomeButton = () => {
    formik?.resetForm();
  }

  return (
    <StyledEngineProvider injectFirst>
      <Container className={homePageStyles.container}>
        <Grid container className={homePageStyles.allHomePageGrid}>

          <Grid container item> 
            <Grid container item xs={12} alignContent="flex-end" className={homePageStyles.iconContainer}>
              <HomeButton onClick={onClickHomeButton} disabled={flightSearchStatus.isLoading} />
            </Grid>
            {flightOffers?.data ? null : (
            <Grid item xs={12}>
              <Typography variant="h5" className={homePageStyles.title}>
                The smartest flight search on the internet
              </Typography>
            </Grid>
            )}
          </Grid>

          <Grid container item xs={12} md={7}>
            <form className={homePageStyles.flightForm} onSubmit={formik.handleSubmit}>
              <Grid container item xs={12}>
                <Grid container item xs={12} justifyContent="space-between" className={homePageStyles.roundPassContainer}>
                  <Grid item xs={6} md={4}>
                    <RoundedSelect
                      formik={formik}
                      optionName="tripType"
                      options={constants.tripType}
                      disabled={flightSearchStatus.isLoading}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <RoundedSelect
                      formik={formik}
                      optionName="passengers"
                      options={constants.passengers}
                      iconName="groupIcon"
                      disabled={flightSearchStatus.isLoading}
                    />
                  </Grid>
                </Grid>

                {
                  flightOffers?.data
                      ? <CompactSearchForm
                          formik={formik}
                      />
                      : <Grid
                          container
                          item
                          xs={12}
                          justifyContent="center"
                          className={homePageStyles.inputsFlightsContainer}
                      >
                        <Grid item xs={12} className={homePageStyles.flightPicker}>
                          <AirportPicker
                              flightType="departure"
                              formik={formik}
                              fieldName="departureFlight"
                              disabled={flightSearchStatus.isLoading}
                              value={formik.values.departureFlight}
                              defaultAirport={{
                                name: "LAX",
                                longName: "LOS ANGELES INTL"
                              }}
                          />
                        </Grid>
                        <Grid item xs={12} className={homePageStyles.flightPicker}>
                          <AirportPicker
                              flightType="destination"
                              formik={formik}
                              fieldName="destinationFlight"
                              disabled={flightSearchStatus.isLoading}
                              value={formik.values.destinationFlight}
                          />
                        </Grid>

                        <Grid item xs={12} className={homePageStyles.dividerContainer}>
                          <hr className={homePageStyles.divider}/>
                        </Grid>

                        <Grid item xs={12} className={homePageStyles.datePicker}>
                          <DatePicker
                              display
                              formik={formik}
                              fieldName="departureDate"
                              value={formik.values.departureDate}
                              label="Departure Date"
                              disabled={flightSearchStatus.isLoading}
                          />
                        </Grid>

                        <Grid item xs={12} className={homePageStyles.datePicker}>
                          <DatePicker
                              display={formik.values.tripType === constants.tripType[0]}
                              formik={formik}
                              fieldName="returnDate"
                              value={formik.values.returnDate}
                              label="Return Date"
                              disabled={flightSearchStatus.isLoading}
                          />
                        </Grid>
                      </Grid>
                }

                <Grid container justifyContent="flex-end" item xs={12} className={homePageStyles.buttonContainer}>
                  <Grid lg={4} xs={12} item paddingBottom="14px">
                    <SubmitButton
                      loading={flightSearchStatus.isLoading}
                      disabled={!formik.isValid}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </form>
            {
              !flightSearchStatus.isLoading && flightSearchStatus.result?.error && 
                <Grid container justifyContent="center" paddingTop="14px">
                  <Alert severity="error">
                    {flightSearchStatus.result!.error!.message}
                  </Alert>
                </Grid>
            }
          </Grid>

          <Grid item xs={12} md={7} container justifyContent="space-between">
            {flightOffers?.data?.map((item: FlightResultsProps) => <FlightCard key={item.id} flightResults={item}/>)}
          </Grid>

        </Grid>
      </Container>
    </StyledEngineProvider>
  );
}

export default HomePage;
