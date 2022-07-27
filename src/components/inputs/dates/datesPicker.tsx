import { Alert, FormControl, TextField }  from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from "moment";

interface DatesPickerProps {
    display: boolean,
    formik: any,
    fieldName: string,
    value: string,
    label: string,
}

const Empty: React.FC = () => <></>

const DatesPicker: React.FC<DatesPickerProps> = ({formik, ...props}: DatesPickerProps) => {
    if(!props.display)
        return <Empty/>


    const handleChange = (v: Moment | null, keyboardInput: string | undefined) => {
        if(v && v!.isValid()){
            let formattedDate = v.toISOString();
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
                    onChange={handleChange}
                    renderInput={
                        (params) => 
                            <TextField
                                {...params}
                                placeholder="Departure Date"
                                name={props.fieldName}
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