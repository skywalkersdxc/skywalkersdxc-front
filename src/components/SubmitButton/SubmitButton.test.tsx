import { render, screen } from "@testing-library/react";
import SubmitButton from "./submitButton";
import userEvent from "@testing-library/user-event";
import sinon from "sinon"; 


describe("Submit Button: Basic Redenring", () => {
    test("Displays 'Submit' label when not disabled", () => {
        render(
            <SubmitButton
                disabled={false}
                loading={false}
            />
        )
        const domNode = screen.getByTestId("submitBtnBase");
        expect(domNode).toBeInTheDocument();
        const submitNode = domNode.querySelector("input[type='submit']");
        const submitTextNode = domNode.querySelector("span");
        expect(submitNode).toBeInTheDocument();
        expect(submitTextNode?.innerHTML).toBe("Submit");
        expect(domNode).not.toHaveClass("Mui-disabled");
    });

    test("Displays disabled button properly", () => {
        render(
            <SubmitButton
                disabled={true}
                loading={false}
            />
        )
        const domNode = screen.getByTestId("submitBtnBase");
        expect(domNode).toBeInTheDocument();
        const submitNode = domNode.querySelector("input[type='submit']");
        const submitTextNode = domNode.querySelector("span:not([class])");
        expect(submitNode).toBeInTheDocument();
        expect(submitTextNode?.innerHTML).toBe("Submit");
        expect(domNode).toHaveClass("Mui-disabled");
    });


    test("Displays Spinning Wheel instead of submit label when loading response", () => {
        render(
            <SubmitButton
                disabled={true}
                loading={true}
            />
        )
        const domNode = screen.getByTestId("submitBtnBase");
        expect(domNode).toBeInTheDocument();
        const submitNode = domNode.querySelector("input[type='submit']");
        const submitTextNode = domNode.querySelector("span:not([class])");
        const spinningWheel = domNode.querySelector("span[data-testid='submitBtn-progressWheel'");
        expect(submitNode).not.toBeInTheDocument();
        expect(submitTextNode).not.toBeInTheDocument();
        expect(spinningWheel).toBeInTheDocument();
        expect(domNode).toHaveClass("Mui-disabled");
    })

    test("Loading flag disables button by default and ignores 'disabled' prop", () => {
        render(
            <SubmitButton
                disabled={false}
                loading={true}
            />
        )
        const domNode = screen.getByTestId("submitBtnBase");
        expect(domNode).toBeInTheDocument();
        const submitNode = domNode.querySelector("input[type='submit']");
        const submitTextNode = domNode.querySelector("span:not([class])");
        const spinningWheel = domNode.querySelector("span[data-testid='submitBtn-progressWheel'");
        expect(submitNode).not.toBeInTheDocument();
        expect(submitTextNode).not.toBeInTheDocument();
        expect(spinningWheel).toBeInTheDocument();
        expect(domNode).toHaveClass("Mui-disabled");
    })
})