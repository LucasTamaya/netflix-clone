import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Nav } from "~src/components/common/Nav";

const mockedSetState = jest.fn();
const mockedUseState: any = (useState: any) => [useState, mockedSetState];
jest.spyOn(React, "useState").mockImplementation(mockedUseState);

describe("Nav component", () => {
  it("should only renders the netflix icon if the user is not authenticated", () => {
    render(<Nav />);

    const netflixIcon = screen.getByAltText("netflix icon");
    const profileIcon = screen.queryByAltText("profile icon");

    expect(netflixIcon).toBeInTheDocument();
    expect(profileIcon).not.toBeInTheDocument();
  });

  it("should renders the netflix and profile icon if the user is authenticated", () => {
    localStorage.setItem("token", "fae889hnjaig");

    render(<Nav />);

    const netflixIcon = screen.getByAltText("netflix icon");
    const profileIcon = screen.getByAltText("profile icon");

    expect(netflixIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

  it("should shows the nav background if window.scrollY is > 100", async () => {
    render(<Nav />);

    // simulate window scrolling
    fireEvent.scroll(window, { target: { scrollY: 101 } });

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith(true);
  });

  it("should hide the nav background if window.scrollY is < 100", () => {
    render(<Nav />);

    fireEvent.scroll(window, { target: { scrollY: 99 } });

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith(false);
  });
});
