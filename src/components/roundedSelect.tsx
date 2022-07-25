import { FormControl, Select, MenuItem, Alert } from '@mui/material';
import homePageStyles from  "../pages/HomePage/HomePage.module.css"

export default function roundedSelect({formik, optionName, options}:
    {formik: any, optionName: string, options: string[] | number[],
    }
    ){
    return(
        <FormControl fullWidth>
            <Select
                data-testid={optionName}
                name={optionName}
                value={formik.values[optionName]}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                className={homePageStyles.roundSelect}
            >
                {options.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
            {formik.errors[optionName] && formik.touched[optionName] ? 
            <Alert severity="error" className={homePageStyles.alertErrors}>
                {formik.errors[optionName]}
            </Alert> 
            : null}
        </FormControl>
    )
}