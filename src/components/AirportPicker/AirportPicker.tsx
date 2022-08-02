import { Alert, Autocomplete, FormControl, TextField } from "@mui/material";
import { Place, AirplanemodeActive } from "@mui/icons-material";
import React from "react";
import styles from "./AirportPicker.module.css";

interface AirportPickerProps {
  airports: any[];
  flightType: string;
  formik: any;
  fieldName: string;
}

interface IconComponentProps {
  type: string;
}

const AirportPicker: React.FC<AirportPickerProps> = ({
  formik,
  airports,
  flightType,
  fieldName,
}: AirportPickerProps) => {
  const handleFlightChange = (event: any, flight: string) => {
    if (!flight) return;
    formik.setFieldValue(fieldName, flight);
  };

  const IconComponent: React.FC<IconComponentProps> = ({ type }) => {
    switch (type) {
      case "departure":
      default:
        return <Place className={styles.icon} />;
      case "destination":
        return <AirplanemodeActive className={styles.icon} />;
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
  return (
    <div>
      <FormControl
        fullWidth
        className={styles.container}
        data-testid={fieldName}
      >
        <IconComponent type={flightType} />
        <Autocomplete
          id="autocompleteSearch"
          data-testid="autocompleteSearch"
          options={airports}
          renderInput={(params) => (
            <TextField {...params} label={selectLabel(flightType)} />
          )}
          className={styles.input}
          onChange={handleFlightChange}
          disableClearable
        />
      </FormControl>
      {formik.errors[fieldName] && (
        <Alert severity="error">{formik.errors[fieldName]}</Alert>
      )}
    </div>
  );
};

export default AirportPicker;
