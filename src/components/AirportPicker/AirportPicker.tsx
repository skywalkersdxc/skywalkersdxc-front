import {Alert, Autocomplete, CircularProgress, FormControl, TextField, Grid} from "@mui/material";
import { Place, AirplanemodeActive } from "@mui/icons-material";
import React, {useCallback, useEffect, useState} from "react";
import { debounce } from "lodash";
import { getData } from "./getData"
import axios from "axios";
import styles from "../../pages/HomePage/HomePage.module.css"

interface AirportPickerProps {
  flightType: string;
  formik: any;
  fieldName: string;
  value: string;
  disabled?: boolean;
  defaultAirport?: {
    name: string,
    longName: string
  };
}

interface IconComponentProps {
  type: string;
}

interface Airport {
  name: string;
  longName: string;
  location: string;
}

const AirportPicker: React.FC<AirportPickerProps> = ({
  formik,
  flightType,
  fieldName,
  value,
  disabled,
  defaultAirport
}: AirportPickerProps) => {
  const handleFlightChange = (event: any, flight: Airport) => {
    if (flight){
      setLabel(flight.longName);
      setSearch(flight.name);
      formik.setFieldValue(fieldName, flight.name);
      return;
    }
    setSearch("")
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

  const [keyword, setKeyword] = useState('')
  const [search, setSearch] = useState(defaultAirport?.name || '')
  const [loading, setLoading] = useState(false)
  const [airportsOptions, setAirportsOptions] = useState([]);
  const [label, setLabel] = useState(defaultAirport?.longName || '');

  const debounceLoadData = useCallback(debounce(setKeyword, 1000), []);

  useEffect(() => {
    debounceLoadData(search);
  }, [search]);


  //useEffect used to reset input value after clicking home button 
  useEffect(() => {
    if(!value || value === defaultAirport?.name) {
      setSearch(value);
    } 
  }, [value]);

  useEffect(() => {
    setLoading(true)
    const { out, source } = getData({ keyword });

    out.then(res => {
      setAirportsOptions(res.data);
      setLoading(false)
    }).catch(err => {
      setAirportsOptions([]);
      axios.isCancel(err);
      setLoading(false)
    });

    return () => {
      source.cancel()
    };
  }, [keyword]);


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
              id="autocompleteSearch"
              data-testid="autocompleteSearch"
              disabled={disabled}
              options={airportsOptions}
              getOptionLabel={(option: Airport) => `${option.longName}, ${option.location} [${option.name}]` }
              loading={loading}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              className={styles.input}
              onChange={handleFlightChange}
              disableClearable
              renderInput={(params) => (
                <TextField {...params}
                  data-testid="autocompleteText"
                  label={selectLabel(flightType)}
                  onChange={e => {
                    e.preventDefault()
                    setSearch(e.target.value);
                    setLabel(e.target.value);
                  }}
                  inputProps={{
                    ...params.inputProps,
                      value: label
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                          {loading ? (
                              <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                    )
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </FormControl>
      {formik.errors[fieldName] && (
        <Alert severity="error">{formik.errors[fieldName]}</Alert>
      )}
    </div>
  );
};

export default AirportPicker;
