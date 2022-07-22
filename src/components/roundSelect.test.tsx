import { render, screen} from '@testing-library/react';
import RoundSelect from "./roundSelect"
import userEvent from '@testing-library/user-event'

test('Check For correct functionallity', async () => {
    render(    
    <RoundSelect 
        formik={{
            values: ["tripType"],
            errors: ["tripType"],
        }}
        optionName="tripType"
        arr={["Round Trip", "One way"]}
    />,
    )
    await userEvent.click(screen.getByTestId("tripType"))
    expect(screen.getByTestId("tripType")).toBeInTheDocument()
})