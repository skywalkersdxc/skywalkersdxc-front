import { render, screen } from "@testing-library/react";
import AirportPicker from "./AirportPicker";
import userEvent from "@testing-library/user-event";

describe("AiportPicker", () => {
  const airports = ["MXN", "USA", "CAN", "ARG", "CHL", "BRZ"];
  test("Renders correctly when display prop is true", async () => {
    render(
      <AirportPicker
        airports={airports}
        flightType="departure"
        formik={{
          errors: {},
        }}
        fieldName="aiport-picker-test"
      />
    );
    expect(screen.getByTestId("aiport-picker-test")).toBeInTheDocument();
  });
});
