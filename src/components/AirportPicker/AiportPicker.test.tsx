import { fireEvent, render, screen } from "@testing-library/react";
import AirportPicker from "./AirportPicker";
import userEvent from "@testing-library/user-event";

describe("AiportPicker component", () => {
  const airports = ["MXN", "USA", "CAN", "ARG", "CHL", "BRZ"];
  test("Renders correctly", async () => {
    render(
      <AirportPicker
        airports={airports}
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
  const airports = ["MXN", "USA", "CAN", "ARG", "CHL", "BRZ"];
  test("Calls formik after a change", async () => {
    let formik = {
      setFieldValue: jest.fn(),
      errors: {},
    };

    render(
      <AirportPicker
        airports={airports}
        flightType="departure"
        formik={formik}
        fieldName="airport-picker-test"
      />
    );
    const autoCompleteSearch = screen.getByLabelText("From");
    userEvent.type(autoCompleteSearch, "MXN");
    await fireEvent.keyDown(autoCompleteSearch, { key: "Enter" });
    expect(autoCompleteSearch).toHaveValue("MXN");
    const autoCompleteItem = screen.getByText("MXN");
    userEvent.click(autoCompleteItem);
    expect(formik.setFieldValue).toHaveBeenCalled();
  });
});
