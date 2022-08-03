import { Button, CircularProgress } from "@mui/material";


interface ISubmitButtonProps {
    loading: boolean
    disabled: boolean
}

const SubmitButton = (props: ISubmitButtonProps) => {
    const buttonContent = props.loading
                            ? <CircularProgress color="primary" size={30}/>
                            : <><input hidden type="submit"/><span>Submit</span></>

    return (
        <Button
            variant="contained"
            disableElevation
            color="primary"
            component="label"
            fullWidth
            disabled={props.disabled || props.loading}
        >
            {buttonContent}
        </Button>
    )
}


export default SubmitButton;