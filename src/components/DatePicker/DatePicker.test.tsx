import { render, screen } from "@testing-library/react";
import DatesPicker from "./DatePicker";
import userEvent from "@testing-library/user-event";
import moment from "moment";
import sinon from "sinon";

describe("DatesPicker: Basic rendering", () => {
    test("Renders correctly when display prop is true", async () => {
        render(
            <DatesPicker
                dispatcher={()=>{}}
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
        expect(domNode).toBeInTheDocument();
    });

    test("Does not render when display prop is false", async () => {
        render(
            <DatesPicker
                dispatcher={()=>{}}
                display={false}
                fieldName="TestPicker"
                value={moment().toISOString()}
                label="Pick a date"
                formik={{
                    errors: {}
                }}
            />
        )
        expect(() => { 
            screen.getByTestId("TestPicker")
        }).toThrowError();
    })
});

describe("DatesPicker: Formik integration", () => {
    test("Calls formik after a change", () => {
        let setFieldValue = sinon.spy();
        let formik = {
            setFieldValue,
            errors: {
            }
        };

        const { container }  = render(
            <DatesPicker
                dispatcher={()=>{}}
                display
                fieldName="TestPicker"
                value={moment().toISOString()}
                label="Pick a date"
                formik={formik}
            />
        )
        let pickerTextNode = container.querySelector("input[name='TestPicker']") as Element;
        userEvent.type(pickerTextNode, "08/01/2022{enter}");
        expect(setFieldValue.calledOnceWith("TestPicker")).toBeTruthy();
    });

    test("Displays error message correctly", () => {
        render(
            <DatesPicker
                dispatcher={()=>{}}
                display
                fieldName="TestPicker"
                value={moment().toISOString()}
                label="Pick a date"
                formik={{
                    errors: {
                        TestPicker: "Some error"
                    }
                }}
            />
        )
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveTextContent("Some error");
    });
});