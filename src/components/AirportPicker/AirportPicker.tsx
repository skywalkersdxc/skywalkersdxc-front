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

export interface IconComponentProps {
  type: string | undefined;
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
        return <Place className={styles.icon} />;
      case "destination":
        return <AirplanemodeActive className={styles.icon} />;
      default:
        return null;
    }
  };

  const selectLabel = (type: string) => {
    switch (type) {
      case "departure":
        return "From";
      case "destination":
        return "To";
      default:
        return null;
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
          disablePortal
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
