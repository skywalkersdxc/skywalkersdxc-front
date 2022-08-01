import { Autocomplete, FormControl, TextField } from "@mui/material";
import { Place, AirplanemodeActive } from "@mui/icons-material";
import React from "react";
import styles from "./AirportPicker.module.css";

interface AirportPickerProps {
  airports: any[];
  flightType: string;
}

export interface IconComponentProps {
  type: string | undefined;
}

const AirportPicker: React.FC<AirportPickerProps> = ({
  airports,
  flightType,
}: AirportPickerProps) => {
  const handleDateChange = (keyboardInput: string | undefined) => {};

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
    <FormControl fullWidth className={styles.container}>
      <IconComponent type={flightType} />
      <Autocomplete
        disablePortal
        options={airports}
        renderInput={(params) => (
          <TextField {...params} label={selectLabel(flightType)} />
        )}
        className={styles.input}
      />
    </FormControl>
  );
};

export default AirportPicker;
