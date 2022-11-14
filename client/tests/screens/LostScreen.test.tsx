import { fireEvent, render, screen } from "@testing-library/react";

import { LostScreen } from "~src/screens/LostScreen";
import { mockedUseNavigate } from "~tests/mocks/useNavigate";

describe("Lost Screen", () => {
  it("should renders the screen correctly", () => {
    render(<LostScreen />);

    const title = screen.getByRole("heading", { name: /404 error/i });
    const errMsg = screen.getByRole("heading", {
      name: /looks like you got lost/i,
    });
    const btn = screen.getByRole("button", { name: /go back home/i });

    expect(title).toBeInTheDocument();
    expect(errMsg).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it("should redirects the user to '/' if he clicks on the button", () => {
    render(<LostScreen />);

    const btn = screen.getByRole("button", { name: /go back home/i });

    fireEvent.click(btn);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });
});
