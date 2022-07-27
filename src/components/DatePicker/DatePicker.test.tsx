import { render, screen } from "@testing-library/react";
import DatesPicker from "./DatePicker";
import userEvent from "@testing-library/user-event";
import moment from "moment";

describe("DatesPicker: Basic rendering", () => {
    test("Renders correctly when display prop is true", async () => {
        render(
            <DatesPicker
                display
                fieldName="TestPicker"
                value={moment().toISOString()}
                label="Pick a date"
                formik={{
                    errors: {}
                }}
            />
        )
        let domNode = screen.getByTestId("TestPicker");
        // await userEvenkt.click(domNode);
        expect(domNode).toBeInTheDocument();
    })
});