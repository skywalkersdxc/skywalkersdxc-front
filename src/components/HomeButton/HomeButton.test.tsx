import { render, screen, fireEvent } from "@testing-library/react";
import HomeButton from "./HomeButton";

const mockedOnClick = jest.fn();

describe("HomeButton component", () => {
  test("renders correctly", () => {
    render(<HomeButton onClick={mockedOnClick} />);

    expect(screen.getByTestId("home-button")).toBeInTheDocument();
  });

  test("called function after is clicked", () => {
    render(
        <HomeButton onClick={mockedOnClick}  />
    );

    fireEvent.click(screen.getByTestId("home-button"));
    expect(mockedOnClick).toBeCalled();
  });

});
