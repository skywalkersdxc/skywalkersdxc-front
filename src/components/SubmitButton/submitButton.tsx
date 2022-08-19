import { Button, CircularProgress, Typography } from "@mui/material";
import styles from "./submitButton.module.css"


interface ISubmitButtonProps {
    loading: boolean
    disabled: boolean
}

const SubmitButton: React.FC<ISubmitButtonProps> = ({loading, disabled}) => {
    const buttonContent = loading
                            ? <CircularProgress color="primary" size={30} data-testid="submitBtn-progressWheel"/>
                            : <><input hidden type="submit" data-testid="submitBtn"/><Typography variant="body2" className={styles.titleButton}>Search</Typography></>

    return (
        <Button
            variant="contained"
            disableElevation
            color="primary"
            component="label"
            fullWidth
            disabled={ disabled || loading }
            data-testid="submitBtnBase"
            className={styles.button}
        >
            {buttonContent}
        </Button>
    )
}


export default SubmitButton;