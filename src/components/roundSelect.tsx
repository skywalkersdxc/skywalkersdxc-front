import { FormControl, Select, MenuItem, Alert } from '@mui/material';

export default function roundSelect({formik, optionName, arr}:
    {formik: any, optionName: string, arr: string[] | number[],
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
                style={{borderRadius: "30px", height: "35px"}}
            >
                {arr.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
            {formik.errors[optionName] && formik.touched[optionName] ? 
              <Alert severity="error" style={{marginTop: "20px"}}>
                {formik.errors[optionName]}
            </Alert> 
            : null}
        </FormControl>
    )
}