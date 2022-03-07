import Button from "components/Button";
import { render, fireEvent } from "@testing-library/react";


const defaultProps = {
  onClick: jest.fn(),
  disabled: false
};

describe("Button", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fire onClick when is clicked", () => {
    const { getByText } = render(<Button {...defaultProps}>title</Button>);
    const button = getByText("title");
    fireEvent.click(button);
    expect(defaultProps.onClick).toBeCalledTimes(1);
  });

  it("should not fire on click with disable true", () => {
    const { getByText } = render(<Button {...defaultProps} disabled={true}>title</Button>);
    const button = getByText("title");
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(0);
  });

});
