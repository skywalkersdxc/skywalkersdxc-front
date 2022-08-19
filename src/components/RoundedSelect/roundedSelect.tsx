import { FormControl, Select, MenuItem, Alert } from "@mui/material";
import homePageStyles from "../../pages/HomePage/HomePage.module.css";
import GroupIcon from "@mui/icons-material/Group";

export interface RoundSelectProps {
  formik: any;
  optionName: string;
  options: string[] | number[];
  iconName?: string;
  disabled?: boolean;
}

export interface IconComponentProps {
  iconName: string | undefined;
}

const IconComponent: React.FC<IconComponentProps> = ({ iconName }) => {
  switch (iconName) {
    case "groupIcon":
      return <GroupIcon />;
    default:
      return null;
  }
};

const RoundedSelect: React.FC<RoundSelectProps> = ({
  formik,
  optionName,
  options,
  iconName,
  disabled
}) => {
  return (
    <FormControl fullWidth>
      <Select
        data-testid={optionName}
        name={optionName}
        {...formik.getFieldProps(optionName)}
        className={homePageStyles.roundSelect}
        disabled={disabled}
      >
        {options.map((item) => (
          <MenuItem key={item} value={item}>
            <IconComponent iconName={iconName} /> {item}
          </MenuItem>
        ))}
      </Select>
      {formik.errors[optionName] && formik.touched[optionName] ? (
        <Alert severity="error" className={homePageStyles.alertErrors}>
          {formik.errors[optionName]}
        </Alert>
      ) : null}
    </FormControl>
  );
};

export default RoundedSelect;
