import { fireEvent, render, screen } from "@testing-library/react";

import { HomeScreen } from "~src/screens/HomeScreen";
import { HelmetWrapper } from "~tests/mocks/HelmetWrapper";
import { mockedUseNavigate } from "~tests/mocks/useNavigate";

jest.spyOn(Storage.prototype, "setItem");

const MockedComponent = () => {
  return (
    <HelmetWrapper>
      <HomeScreen />
    </HelmetWrapper>
  );
};

describe("Home Screen", () => {
  it("should renders the screen correctly", () => {
    render(<MockedComponent />);

    const titles = screen.getAllByRole("heading");
    const button = screen.getByRole("button", { name: /get started/i });

    expect(titles).toHaveLength(3);
    expect(button).toBeInTheDocument();
  });

  it("should redirects the user to '/login' if he clicks on Get Started button", () => {
    render(<MockedComponent />);

    const button = screen.getByRole("button", { name: /get started/i });

    fireEvent.click(button);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login");
  });

  it("should redirects the user to '/browse' if he is already authenticated", () => {
    // when a user is auth, he has token value in localStorage
    localStorage.setItem("token", "fae889hnjaig");

    render(<MockedComponent />);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/browse");
  });
});
