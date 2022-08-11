import React from "react";
import { Button, Divider, Fade, Grid, IconButton, Modal, Typography } from "@mui/material";
import HomeButton from "../HomeButton/HomeButton";
import CloseIcon from "@mui/icons-material/Close";
import flightDetailsModalStyles from "./FlightDetailsModal.module.css";
import { FlightResultsProps } from "../../pages/HomePage/interfaces";
import FlightCard from "../FlightCard/FlightCard";
import FlightItineraryInfo from "./FlightItineraryInfo";
import SubmitButton from "../SubmitButton/submitButton";
import { margin } from "@mui/system";

type FlightDetailsProps = {
    flightOffer: FlightResultsProps,
    open: boolean
    setOpen: (val: boolean) => void;
}

const FlightDetailsModal: React.FC<FlightDetailsProps> = ({ flightOffer, open, setOpen }) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-describedby="modal-modal-description"
        >
            <Fade in={open}>
                <Grid container className={flightDetailsModalStyles.container} direction={"column"} xs={12}>
                    {/* head */}
                    <Grid item xs={1}>
                        <Grid item container >
                            <Grid container item xs={2} alignItems={"center"}>
                                <HomeButton isHomePage={false} />
                            </Grid>
                            <Grid item container xs={7} alignItems={"center"}>
                                <Typography id="modal-modal-description">
                                    Review Flight
                                </Typography>
                            </Grid>
                            <Grid item container xs={3} justifyContent={"flex-end"} alignItems={"center"}>
                                <IconButton onClick={handleClose} aria-label="delete">
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider className={flightDetailsModalStyles.dividerAmount} />
                        </Grid>
                    </Grid>

                    {/* content */}
                    <Grid item xs={10}>
                        <Grid container direction={"column"} xs={12} >
                            <Grid item xs={1}>
                                <FlightCard flightResults={flightOffer} showMode={true} />
                            </Grid>
                            <Grid item xs={11} direction={"column"}>
                                <Grid container xs={12} direction={"column"} >
                                    <FlightItineraryInfo flightOffer={flightOffer} title={"OUTBOUND FLIGHT"} />
                                    <FlightItineraryInfo flightOffer={flightOffer} title={"RETURN FLIGHT"} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>



                    {/* footer */}
                    <Grid item xs={1} height={'100%'}>
                        <Grid item xs={12} container direction={'column'} justifyContent={"space-between"} height={'100%'}>
                            <Grid item xs={1}>
                                <Divider className={flightDetailsModalStyles.dividerAmount} />
                            </Grid>

                            <Grid container item xs={11} alignItems={'center'}>

                                <Grid container item direction={'row'} xs={12} >

                                    <Grid container item xs={8} alignItems={'end'} >
                                        <Typography variant={"body1"} gutterBottom>
                                            PRICE
                                        </Typography>
                                    </Grid>

                                    <Grid container item xs={4} >
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            color="primary"
                                            component="label"
                                            fullWidth
                                            data-testid="BookBtnBase"
                                        >
                                            Book now
                                        </Button>
                                    </Grid>

                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal >
    )
};

export default FlightDetailsModal;
