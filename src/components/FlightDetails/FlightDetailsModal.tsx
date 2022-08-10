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
                    <Grid item container xs={1}>
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
                            <Grid item xs={1}>
                                <FlightCard flightResults={flightOffer} showMode={true}/>
                            </Grid>
                            <Grid item xs={8} direction={"column"} style={{backgroundColor: "aqua", minHeight: '72%'}}>
                                <FlightItineraryInfo flightOffer={flightOffer}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* footer */ }
                    <Grid item container style={{backgroundColor:"yellow"}} xs={1}>

                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    )
};

export default FlightDetailsModal;
