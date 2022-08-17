import { Alert, FormControl, Grid, TextField }  from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from "moment";
import homePageStyles from "../../pages/HomePage/HomePage.module.css";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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
                <Grid container>
                    <Grid item xs={2} container justifyContent="center">
                        <CalendarTodayIcon/>
                    </Grid>
                    <Grid item xs={10}>
                        <MobileDatePicker
                            data-testid={props.fieldName}
                            label={props.label}
                            onChange={handleDateChange}
                            disabled={props.disabled}
                            renderInput={
                                (params) =>
                                    <TextField
                                        {...formik.getFieldProps(props.fieldName)}
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            readOnly: true,
                                        }}
                                        InputProps={{
                                            ...params.InputProps,
                                            className: homePageStyles.inputDateField
                                        }}
                                    />
                            }
                            value={props.value}
                            closeOnSelect
                            disablePast
                            minDate={today}
                            className={homePageStyles.datePickerInput}
                        />
                        {formik.errors[props.fieldName] && formik.touched[props.fieldName] ? (
                            <Alert severity="error">
                                {formik.errors[props.fieldName]}
                            </Alert>
                        ) : null}
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </FormControl>
    )
}

export default DatesPicker;