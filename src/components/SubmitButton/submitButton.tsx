import { Button, CircularProgress, IconButtonClassKey } from "@mui/material";


interface ISubmitButtonProps {
    loading: boolean
    disabled: boolean
}

const SubmitButton: React.FC<ISubmitButtonProps> = ({loading, disabled}) => {
    const buttonContent = loading
                            ? <CircularProgress color="primary" size={30} data-testid="submitBtn-progressWheel"/>
                            : <><input hidden type="submit" data-testid="submitBtn"/><span>Submit</span></>

    return (
        <Button
            variant="contained"
            disableElevation
            color="primary"
            component="label"
            fullWidth
            disabled={ disabled || loading }
            data-testid="submitBtnBase"
        >
            {buttonContent}
        </Button>
    )
}


export default SubmitButton;