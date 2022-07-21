import { FormControl, Select, MenuItem } from '@mui/material';

export default function roundSelect({value, optionName, handleChange, arr}:
    {value: string | number, optionName: string, handleChange: Function, arr: string[] | number[]}
    ){
    return(
        <FormControl fullWidth>
            <Select
            value={value}
            onChange={(e) => handleChange(e, optionName)}
            style={{borderRadius: "30px", height: "35px"}}
            >
                {arr.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
        </FormControl>
    )
}