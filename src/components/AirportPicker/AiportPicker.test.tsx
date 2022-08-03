import { fireEvent, render, screen } from "@testing-library/react";
import AirportPicker from "./AirportPicker";
import userEvent from "@testing-library/user-event";

describe("AiportPicker component", () => {
  test("Renders correctly", async () => {
    render(
      <AirportPicker
        flightType="departure"
        formik={{
          errors: {},
        }}
        fieldName="airport-picker-test"
      />
    );
    expect(screen.getByTestId("airport-picker-test")).toBeInTheDocument();
  });
});

describe("Airport Component: Formik integration", () => {
  test("Calls formik after a change", async () => {
    let formik = {
      setFieldValue: jest.fn(),
      errors: {},
    };

    render(
      <AirportPicker
        flightType="departure"
        formik={formik}
        fieldName="airport-picker-test"
      />
    );
    const autoCompleteSearch = screen.getByLabelText("From");
    userEvent.type(autoCompleteSearch, "ATL");
    fireEvent.keyDown(autoCompleteSearch, { key: 'ArrowDown' })
    fireEvent.keyDown(autoCompleteSearch, {key: "Enter"});
    expect(autoCompleteSearch).toHaveValue("ATL");
    const autoCompleteItem = await screen.getByText("ATL");
    userEvent.click(autoCompleteItem);
    expect(formik.setFieldValue).toHaveBeenCalled();
  });
});
