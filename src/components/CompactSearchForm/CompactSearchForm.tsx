import {Grid} from "@mui/material";

import compactSearchFormStyle from './CompactSearchForm.module.css'
import {AirportPicker, DatePicker} from "../index";
import {useState} from "react";
import {IFlightSearchStatus} from "../../pages/HomePage/interfaces";
import {FormState} from "../../utils/FormReducer";
import constants from "../../utils/constants";

interface options {
    name: string;
    label: string;
  }

interface Props {
    formik: any
    departureDispatcher: Function;
    arrivalDispatcher: Function;
    dateDepartureDispatcher: Function;
    dateArrivalDispatcher: Function;
    formState: FormState
    handleDataName: Function;
    airportsOptions: options[];
    handleFlightChange: Function;
}

export const CompactSearchForm = (
    { 
        formik, 
        departureDispatcher, 
        arrivalDispatcher, 
        formState, 
        dateDepartureDispatcher, 
        dateArrivalDispatcher, 
        handleDataName, 
        airportsOptions,
        handleFlightChange,
    }: Props) => {
    const [flightSearchStatus, setFlightSearchStatus] = useState<IFlightSearchStatus>({isLoading: false});

    return (
        <Grid container className={compactSearchFormStyle.parentContainer}>
            <Grid container item className={compactSearchFormStyle.inputsFlightsContainer}>
                <Grid item xs={6} className={compactSearchFormStyle.flightPicker}>
                    <AirportPicker
                        handleDataName={handleDataName}
                        flightType="departure"
                        formik={formik}
                        fieldName="departureFlight"
                        compact
                        airportsOptions={airportsOptions}
                        handleFlightChange={handleFlightChange}
                    />

                </Grid>
                <Grid item xs={6} className={compactSearchFormStyle.flightPicker}>
                    <AirportPicker
                        handleDataName={handleDataName}
                        flightType="destination"
                        formik={formik}
                        fieldName="destinationFlight"
                        compact
                        airportsOptions={airportsOptions}
                        handleFlightChange={handleFlightChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <hr className={compactSearchFormStyle.separator} />
                </Grid>
                <Grid container item className={compactSearchFormStyle.inputsFlightsContainer}>
                    <Grid item xs={6} className={compactSearchFormStyle.flightPicker}>
                        <DatePicker
                            display
                            dispatcher={dateDepartureDispatcher}
                            formik={formik}
                            fieldName="departureDate"
                            value={formik.values.departureDate}
                            label="Departure Date"
                            disabled={flightSearchStatus.isLoading}
                        />
                    </Grid>
                    <Grid item xs={6} className={compactSearchFormStyle.flightPicker}>
                        <DatePicker
                            display={formik.values.tripType === constants.tripType[0]}
                            dispatcher={dateArrivalDispatcher}
                            formik={formik}
                            fieldName="returnDate"
                            value={formik.values.returnDate}
                            label="Return Date"
                            disabled={flightSearchStatus.isLoading}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}