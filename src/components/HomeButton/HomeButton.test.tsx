import { render, screen, fireEvent } from "@testing-library/react";
import HomeButton from "./HomeButton";
import { MemoryRouter } from "react-router-dom";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigator,
}));

describe("HomeButton component", () => {
  test("renders correctly", () => {
    render(<HomeButton />);

    expect(screen.getByTestId("home-button")).toBeInTheDocument();
  });

  test("navigates to /", () => {
    render(
      <MemoryRouter>
        <HomeButton />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("home-button"));
    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
});
