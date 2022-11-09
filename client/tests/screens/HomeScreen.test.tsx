import { fireEvent, render, screen } from "@testing-library/react";

import { HomeScreen } from "@screens/HomeScreen";
import { RouterWrapper } from "@mocks/RouterWrapper";
import { mockedUseNavigate } from "@mocks/useNavigate";

// mock localStorage setItem fn
jest.spyOn(Storage.prototype, "setItem");

const MockedComponent = () => {
  return (
    <RouterWrapper>
      <HomeScreen />
    </RouterWrapper>
  );
};

describe("Browse Screen", () => {
  it("should renders the screen correctly", () => {
    render(<MockedComponent />);

    const titles = screen.getAllByRole("heading");
    const input = screen.getByPlaceholderText(/email address/i);
    const button = screen.getByRole("button", { name: /get started/i });

    expect(titles).toHaveLength(3);
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should stores the user email in localStorage if he clicks on Get Started button", () => {
    render(<MockedComponent />);

    const input = screen.getByPlaceholderText(/email address/i);
    const button = screen.getByRole("button", { name: /get started/i });

    const userEmail = "john.doe@gmail.com";

    fireEvent.change(input, { target: { value: userEmail } });
    fireEvent.click(button);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("email", userEmail);
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
