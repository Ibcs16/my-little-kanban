import { screen } from "@testing-library/react";
import Home from "../pages/index";
import { render } from "../utils/test-utils";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
