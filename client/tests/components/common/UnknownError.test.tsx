import { render, screen } from "@testing-library/react";

import { UnknownError } from "~src/components/Common/UnknownError";

describe("UnauthorizedError Component", () => {
  it("should renders the component correctly", () => {
    render(<UnknownError />);

    const title = screen.getByRole("heading", {
      name: /oops, something went wrong.../i,
    });
    const errMsg = screen.getByRole("heading", {
      name: /try to reload the page/i,
    });

    expect(title).toBeInTheDocument();
    expect(errMsg).toBeInTheDocument();
  });
});
