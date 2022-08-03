import { fireEvent, render, screen } from "@testing-library/react";
import AirportPicker from "./AirportPicker";
import userEvent from "@testing-library/user-event";

describe("AiportPicker component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
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
  afterEach(() => {
    jest.clearAllMocks()
  })
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
    setTimeout(()=>{
      fireEvent.keyDown(autoCompleteSearch, { key: 'ArrowDown' })
      fireEvent.keyDown(autoCompleteSearch, {key: "Enter"})
      expect(autoCompleteSearch).toHaveValue("ATL");
      const autoCompleteItem = screen.getByTestId("autocompleteText")
      userEvent.click(autoCompleteItem);
      expect(formik.setFieldValue).toHaveBeenCalled();
    }, 2000)
  });

  test.only("Validate no option", ()=>{
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
    userEvent.type(autoCompleteSearch, "XXX");
    setTimeout(()=>{
      fireEvent.keyDown(autoCompleteSearch, { key: 'ArrowDown' })
      fireEvent.keyDown(autoCompleteSearch, {key: "Enter"})
      expect(autoCompleteSearch).toHaveValue("XXX");
      const autoCompleteItem = screen.getByTestId("autocompleteText")
      expect(autoCompleteItem).toHaveTextContent('No options')
      expect(formik.setFieldValue).not.toHaveBeenCalled();
    }, 2000)
  })
});

