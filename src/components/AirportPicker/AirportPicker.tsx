import {Alert, Autocomplete, FormControl, TextField, Grid } from "@mui/material";
import { Place, AirplanemodeActive } from "@mui/icons-material";
import React, { useEffect, useState} from "react";
import { getData } from "./getData"
import axios from "axios";
import styles from "../../pages/HomePage/HomePage.module.css"
import {Airport} from "../../intefaces/flights";

interface AirportPickerProps {
  flightType: string;
  formik: any;
  fieldName: string;
  handleDataName: Function
}

interface IconComponentProps {
  type: string;
}

const AirportPicker: React.FC<AirportPickerProps> = ({
  formik,
  flightType,
  fieldName,
  handleDataName
}: AirportPickerProps) => {
  const handleFlightChange = (flightInfo: string) => {
    const { out } = getData({keyword: flightInfo});
    const lowerCase = flightInfo.toLowerCase()

    if(lowerCase === "lax" ){
      formik.setFieldValue(fieldName, "LOS ANGELES, CA, LOS ANGELES INTL")
      handleDataName({name: "LAX", type: fieldName})
    } else {
      formik.setFieldValue(fieldName, flightInfo)
    }

    out.then(res => {
      setAirportsOptions(res.data);
    }).catch(err => {
      axios.isCancel(err);
    });
  };

  const IconComponent: React.FC<IconComponentProps> = ({ type }) => {
    switch (type) {
      case "departure":
      default:
        return <Place className={styles.airportPickerIcon}/>;
      case "destination":
        return <AirplanemodeActive className={styles.airportPickerIcon}/>;
    }
  };

  const selectLabel = (type: string) => {
    switch (type) {
      case "departure":
        return "From";
      case "destination":
        return "To";
    }
  };

  const [airportsOptions, setAirportsOptions] = useState([{name: "Loading ...", label: "Loading ..."}]);
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    handleFlightChange(formik.initialValues[fieldName])
  }, []);

  const handleAutocomplete = (info: HTMLElement) => {
    const nameCode = airportsOptions.filter((item) => item.label === info.innerText)
    formik.setFieldValue(fieldName, nameCode[0].label)
    handleDataName({name: nameCode[0].name, type: fieldName})
    setIsDisabled(true)
  }

  return (
    <div>
      <FormControl
        fullWidth
        data-testid={fieldName}
      >
        <Grid container>
          <Grid item xs={2} container justifyContent="center" alignContent="center">
            <IconComponent type={flightType}/>
          </Grid>
          <Grid item xs={10}>
          <Autocomplete
            disablePortal
            id="autocompleteSearch"
            data-testid="autocompleteSearch"
            disabled={isDisabled}
            options={airportsOptions}
            onChange={(e: any) => handleAutocomplete(e.target)}
            value={formik.getFieldProps(fieldName).value}
            renderInput={(params) => {
              return (
                <TextField
                {...params}
                label={selectLabel(flightType)}
                onChange={(e: any) => handleFlightChange(e.target.value)}
                onBlur={formik.getFieldProps(fieldName).onBlur}
                value={formik.getFieldProps(fieldName).value}
                name={formik.getFieldProps(fieldName).name}
                />
              )
            }}
          />
          </Grid>
        </Grid>
      </FormControl>
      {formik.errors[fieldName] && formik.touched[fieldName] ? (
        <Alert severity="error">{formik.errors[fieldName]}</Alert>
      ): null}
    </div>
  );
};

export default AirportPicker;
