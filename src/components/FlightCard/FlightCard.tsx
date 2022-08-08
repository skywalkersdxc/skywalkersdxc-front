import { FlightResultsProps,  } from "../../pages/HomePage/interfaces";
import {Box, Button, Divider, Fade, Grid, IconButton, Modal, Typography} from "@mui/material";
import flightCardStyles from "./FlightCard.module.css"
import FlightInfoComponent from "./FlightInfoComponent";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import HomeButton from "../HomeButton/HomeButton";

type FlightDetailsProps = {
    flightDetail: FlightResultsProps
}

const FlightCard: React.FC<{flightResults: FlightResultsProps}> = ({flightResults} : {flightResults: FlightResultsProps}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const FlightDetailsModal: React.FC<FlightDetailsProps> = ({flightDetail}) => {
        const style = {
            bgcolor: 'background.paper',
            height: '100%',
            p: 1,
        };

        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    <Grid container sx={style} direction={"column"} xs={12}>
                        {/* head */ }
                        <Grid item container xs={1}>
                            <Grid item container alignContent={"space-between"}>
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
                                <Divider className={flightCardStyles.dividerAmount}/>
                            </Grid>
                        </Grid>

                        {/* content */ }
                        <Grid item container xs={10}>

                        </Grid>

                        {/* footer */ }
                        <Grid item container style={{backgroundColor:"yellow"}} xs={1}>

                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        )
    };

   return (
    <Grid data-testid="flightCard" key={flightResults.id} container item className={flightCardStyles.containerCard} xs={12}>
        {flightResults.itineraries.map((item) => <FlightInfoComponent key={item.duration} itineraries={item.segments[0]}/>)}
        <Grid item xs={12} container flexDirection="row" className={flightCardStyles.amountContainer}>
            <Grid item xs={12}>
                <hr className={flightCardStyles.dividerAmount}/>
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end">
                <Grid item xs={4} container justifyContent="flex-end">
                    <Button onClick={handleOpen} variant="outlined" className={flightCardStyles.amountButton}>${flightResults.price.total}</Button>
                </Grid>
            </Grid>
        </Grid>

        { <FlightDetailsModal flightDetail={flightResults}/> }
    </Grid>
   )
}

export default FlightCard

