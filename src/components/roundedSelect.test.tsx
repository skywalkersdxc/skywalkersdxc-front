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
        options={[constants.trypType.round, constants.trypType.oneWay]}
    />,
    )
    await userEvent.click(screen.getByTestId("tripType"))
    expect(screen.getByTestId("tripType")).toBeInTheDocument()
})