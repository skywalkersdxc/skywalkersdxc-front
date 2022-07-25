import { render, screen} from '@testing-library/react';
import RoundedSelect from "./roundedSelect"
import userEvent from '@testing-library/user-event'

test('Check For correct functionallity', async () => {
    render(    
    <RoundedSelect 
        formik={{
            values: ["tripType"],
            errors: ["tripType"],
        }}
        optionName="tripType"
        options={["Round Trip", "One way"]}
    />,
    )
    await userEvent.click(screen.getByTestId("tripType"))
    expect(screen.getByTestId("tripType")).toBeInTheDocument()
})