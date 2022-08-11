import React from "react";
import {Divider, Fade, Grid, IconButton, Modal, Typography} from "@mui/material";
import HomeButton from "../HomeButton/HomeButton";
import CloseIcon from "@mui/icons-material/Close";
import flightDetailsModalStyles from "./FlightDetailsModal.module.css";
import {FlightResultsProps} from "../../pages/HomePage/interfaces";
import FlightCard from "../FlightCard/FlightCard";
import FlightItineraryInfo from "./FlightItineraryInfo";

type FlightDetailsProps = {
    flightOffer: FlightResultsProps,
    open: boolean
    setOpen: (val: boolean) => void;
}

const FlightDetailsModal: React.FC<FlightDetailsProps> = ({flightOffer, open, setOpen}) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-describedby="modal-modal-description"
        >
            <Fade in={open}>
                <Grid container className={flightDetailsModalStyles.container} direction={"column"} xs={12}>
                    {/* head */ }
                    <Grid item  xs={1}>
                        <Grid item container >
                            <Grid container item xs={2} alignItems={"center"}>
                                <HomeButton isHomePage={false}/>
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
                        <Grid container direction={"column"} xs={12}>
                            <Grid item height={"30%"}>
                                {<FlightCard flightResults={flightOffer} showMode={true}/>}
                            </Grid>
                            <Grid item container height={"70%"} direction={"column"} style={{backgroundColor: ""}}>
                                <Grid container xs={12}>
                                    <FlightItineraryInfo flightOffer={flightOffer} title={"OUTBOUND FLIGHT"}/>
                                    <FlightItineraryInfo flightOffer={flightOffer} title={"RETURN FLIGHT"}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* footer */ }
                    <Grid item  style={{backgroundColor:"yellow"}} xs={1}>

                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    )
};

export default FlightDetailsModal;
