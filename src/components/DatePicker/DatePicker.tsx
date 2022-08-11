import { Alert, FormControl, TextField }  from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from "moment";
import homePageStyles from "../../pages/HomePage/HomePage.module.css";

interface DatesPickerProps {
    display: boolean,
    formik: any,
    fieldName: string,
    value: string,
    label: string,
    disabled?: boolean;
}

const Empty: React.FC = () => <></>

const DatesPicker: React.FC<DatesPickerProps> = ({formik, ...props}: DatesPickerProps) => {
    if(!props.display)
        return <Empty/>


    const handleDateChange = (dateValue: Moment | null, keyboardInput: string | undefined) => {
        if(!dateValue) return;

        if(dateValue.isValid()){
            const formattedDate = dateValue.toISOString();
            formik.setFieldValue(props.fieldName, formattedDate);
        }
    }
    const today = moment();
    return (
        <FormControl fullWidth
        data-testid={props.fieldName}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    data-testid={props.fieldName}
                    label={props.label}
                    onChange={handleDateChange}
                    disabled={props.disabled}
                    renderInput={
                        (params) => 
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps, 
                                    readOnly: true, 
                                }}
                                name={props.fieldName}
                                InputProps={{
                                    ...params.InputProps,
                                    className: homePageStyles.inputDateField
                                }}
                                label={props.label}
                            />
                    }
                    value={props.value} 
                    closeOnSelect
                    disablePast
                    minDate={today}
                />
                {formik.errors[props.fieldName] && 
                    <Alert severity="error">
                        {formik.errors[props.fieldName]}
                    </Alert>
                }
            </LocalizationProvider>
        </FormControl>
    )
}

export default DatesPicker;