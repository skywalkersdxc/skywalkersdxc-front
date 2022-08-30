import React from "react";
import {Button, Divider, Fade, Grid, IconButton, Modal, Typography} from "@mui/material";
import HomeButton from "../HomeButton/HomeButton";
import CloseIcon from "@mui/icons-material/Close";
import flightDetailsModalStyles from "./FlightDetailsModal.module.css";
import {FlightResultsProps} from "../../pages/HomePage/interfaces";
import FlightCard from "../FlightCard/FlightCard";
import FlightItineraryInfo from "./FlightItineraryInfo";
import {colors} from "../../utils/theme";

type FlightDetailsProps = {
    flightOffer: FlightResultsProps,
    open: boolean
    setOpen: (val: boolean) => void;
    onHomeButtonClick?: () => void;
}

const FlightDetailsModal: React.FC<FlightDetailsProps> = ({flightOffer, open, setOpen, onHomeButtonClick}) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-describedby="modal-modal-description"
            data-testid={"modalFlightDetails"}
        >
            <Fade in={open}>
                <Grid container item className={flightDetailsModalStyles.container} direction={"column"} xs={12} wrap="nowrap" sx={{ overflow: "auto" }}>
                    {/* head */ }
                    <Grid item xs={1}>
                        <Grid item container>
                            <Grid container item xs={2} alignItems={"center"}>
                                <HomeButton onClick={onHomeButtonClick} />
                            </Grid>
                            <Grid item container xs={7} alignItems={"center"}>
                                <Typography id="modal-modal-description">
                                    Review Flight
                                </Typography>
                            </Grid>
                            <Grid item container xs={3} justifyContent={"flex-end"} alignItems={"center"}>
                                <IconButton onClick={handleClose} aria-label="delete">
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider className={flightDetailsModalStyles.dividerAmount}/>
                        </Grid>
                    </Grid>

                    {/* content */ }
                    <Grid item container xs={10}>
                        <Grid container direction={"column"}>
                            <Grid item height={"30%"}>
                                {<FlightCard flightResults={flightOffer} showMode={true}/>}
                            </Grid>
                            <Grid item container height={"70%"} direction={"column"}>
                                <Grid container item xs={12}>
                                    <FlightItineraryInfo flightOffer={flightOffer}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* footer */ }
                    <Grid item container xs={1} direction={"column"} marginTop={"0.1em"}>
                        <Divider className={flightDetailsModalStyles.dividerAmount} />
                        <Grid item container direction={'row'} marginTop={"0.8em"}>
                             <Grid item xs={6}>
                                <Typography variant={"h6"} color={colors.primary.main}>
                                    ${flightOffer.price.total}
                                </Typography>
                            </Grid>
                            <Grid item container justifyContent={"flex-end"} xs={6}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    color="primary"
                                    component="label"
                                    data-testid="BookBtnBase"
                                    style={{textTransform: 'capitalize'}}
                                >
                                    Book now
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    )
};

export default FlightDetailsModal;
