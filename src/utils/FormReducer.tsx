import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {Airport} from "../intefaces/flights";
import {Moment} from "moment";

export type FormState = {
    departureAirport: Airport;
    arrivalAirport: Airport;
    departureDate: Moment;
    arrivalDate: Moment;
}

type FormActions =
    | {type: "departureAirportChange", payload: Airport}
    | {type: "arrivalAirportChange", payload: Airport}
    | {type: "departureDateChange", payload: Moment}
    | {type: "arrivalDateChange", payload: Moment}

export const formReducer = (state: FormState, action: FormActions) => {
    switch (action.type){
        case "departureAirportChange":
            return {...state, departureAirport: action.payload}
        case "arrivalAirportChange":
            return {...state, arrivalAirport: action.payload}
        case "departureDateChange":
            return {...state, departureDate: action.payload}
        case "arrivalDateChange":
            return {...state, arrivalDate: action.payload}
        default:
            throw Error()
    }
}
