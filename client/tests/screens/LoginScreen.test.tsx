import { fireEvent, screen } from "@testing-library/react";

import { RouterWrapper } from "@mocks/RouterWrapper";
import { LoginScreen } from "@screens/LoginScreen";
import { renderWithClient } from "../config/mswUtils";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
}));

const mockedUseNavigate = jest.fn();

const MockedComponent = () => {
  return (
    <RouterWrapper>
      <LoginScreen />
    </RouterWrapper>
  );
};

describe("LoginScreen", () => {
  it("should renders the screen correctly", async () => {
    renderWithClient(<MockedComponent />);

    const emailInput = screen.getByPlaceholderText(/email address/i);
    const pwdInput = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole("button", {
      name: /login/i,
    });

    fireEvent.change(emailInput, { target: { value: "john.doe@gmail.com" } });
    fireEvent.change(pwdInput, { target: { value: "123456" } });
    fireEvent.click(submitBtn);

    const profileIcon = await screen.findByAltText("profile icon");

    expect(profileIcon).toBeInTheDocument();
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/browse");
  });
});
