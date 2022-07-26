import { render, screen} from '@testing-library/react';
import RoundedSelect from "./roundedSelect"
import userEvent from '@testing-library/user-event'
import constants from "../utils/constants"

test('Check For correct functionallity', async () => {
    render(    
    <RoundedSelect 
        formik={{
            values: ["tripType"],
            errors: ["tripType"],
        }}
        optionName="tripType"
        options={constants.tripType}
    />,
    )
    await userEvent.click(screen.getByTestId("tripType"))
    expect(screen.getByTestId("tripType")).toBeInTheDocument()
})

test('Check for Error Message', async () => {
    render(    
    <RoundedSelect 
        formik={{
            values: ["tripType"],
            errors: {tripType: 'Trip type is required!'},
            touched: {tripType: true},
        }}
        optionName="tripType"
        options={[]}
    />,
    )
    await userEvent.click(screen.getByTestId("tripType"))
    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.getByRole("alert")).toHaveTextContent("Trip type is required!")
})