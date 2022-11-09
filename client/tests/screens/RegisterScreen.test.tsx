import { fireEvent, screen } from "@testing-library/react";

import { RouterWrapper } from "@mocks/RouterWrapper";
import { renderWithClient } from "../config/mswUtils";
import { RegisterScreen } from "@screens/RegisterScreen";
import { mockedUseNavigate } from "@mocks/useNavigate";

const MockedComponent = () => {
  return (
    <RouterWrapper>
      <RegisterScreen />
    </RouterWrapper>
  );
};

describe("RegisterScreen", () => {
  it("should renders the screen correctly", async () => {
    renderWithClient(<MockedComponent />);

    const emailInput = screen.getByPlaceholderText(/email address/i);
    const pwdInput = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole("button", {
      name: /register/i,
    });

    fireEvent.change(emailInput, { target: { value: "john.doe@gmail.com" } });
    fireEvent.change(pwdInput, { target: { value: "123456" } });
    fireEvent.click(submitBtn);

    const profileIcon = await screen.findByAltText("profile icon");

    expect(profileIcon).toBeInTheDocument();
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/select-plans");
  });
});
