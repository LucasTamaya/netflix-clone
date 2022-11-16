import { render, screen } from "@testing-library/react";

import { UnauthorizedError } from "~src/components/Common/UnauthorizedError";

describe("UnauthorizedError Component", () => {
  it("should renders the component correctly", () => {
    render(<UnauthorizedError />);

    const title = screen.getByRole("heading", { name: /Unauthorized access/i });
    const errMsg = screen.getByRole("heading", {
      name: /you are going to be redirected/i,
    });

    expect(title).toBeInTheDocument();
    expect(errMsg).toBeInTheDocument();
  });
});
