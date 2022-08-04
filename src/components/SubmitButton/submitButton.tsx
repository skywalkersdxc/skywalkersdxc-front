import { Button, CircularProgress } from "@mui/material";


interface ISubmitButtonProps {
    loading: boolean
    disabled: boolean
}

const SubmitButton = (props: ISubmitButtonProps) => {
    const buttonContent = props.loading
                            ? <CircularProgress color="primary" size={30} data-testid="submitBtn-progressWheel"/>
                            : <><input hidden type="submit" data-testid="submitBtn"/><span>Submit</span></>

    return (
        <Button
            variant="contained"
            disableElevation
            color="primary"
            component="label"
            fullWidth
            disabled={props.disabled || props.loading}
            data-testid="submitBtnBase"
        >
            {buttonContent}
        </Button>
    )
}


export default SubmitButton;