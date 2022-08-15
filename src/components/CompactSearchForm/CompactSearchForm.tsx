import {Grid} from "@mui/material";

import compactSearchFormStyle from './CompactSearchForm.module.css'
import {AirportPicker} from "../index";
import {useState} from "react";
import {IFlightSearchStatus} from "../../pages/HomePage/interfaces";

interface Props {
    formik: any
}

export const CompactSearchForm = ({ formik }: Props) => {
    const [flightSearchStatus, setFlightSearchStatus] = useState<IFlightSearchStatus>({isLoading: false});

    return (
        <Grid container className={compactSearchFormStyle.parentContainer}>
            <Grid container item className={compactSearchFormStyle.inputsFlightsContainer}>
                <Grid item xs={6} className={compactSearchFormStyle.flightPicker}>
                    <AirportPicker
                        flightType="departure"
                        formik={formik}
                        fieldName="departureFlight"
                        disabled={flightSearchStatus.isLoading}
                        value={formik.values.departureFlight}
                    />
                </Grid>
                <Grid item xs={6} className={compactSearchFormStyle.flightPicker}>
                    <AirportPicker
                        flightType="destination"
                        formik={formik}
                        fieldName="destinationFlight"
                        disabled={flightSearchStatus.isLoading}
                        value={formik.values.destinationFlight}
                    />
                </Grid>
                <div className={compactSearchFormStyle.separator} />

            </Grid>
        </Grid>
    )
}