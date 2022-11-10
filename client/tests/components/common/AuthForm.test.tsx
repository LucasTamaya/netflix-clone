import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { AuthForm } from "@components/common/AuthForm";
import { RouterWrapper } from "@mocks/RouterWrapper";
import { authMethods } from "@mocks/authMethods";
import { mockedUseNavigate } from "@mocks/useNavigate";
import {
  MOCKED_INVALID_EMAIL,
  MOCKED_EMAIL,
  MOCKED_PWD,
  MOCKED_INVALID_PWD,
} from "@mocks/data";

interface Props {
  title: "Login" | "Register";
  isLoading: boolean;
  error: string | undefined;
  changeAuthMethodPath: "/login" | "/register";
}

const mockedMutate = jest.fn();

const MockedComponent: React.FC<Props> = ({
  title,
  isLoading,
  error,
  changeAuthMethodPath,
}) => {
  return (
    <RouterWrapper>
      <AuthForm
        title={title}
        email=""
        setEmail={jest.fn()}
        password=""
        setPassword={jest.fn()}
        mutate={mockedMutate}
        isLoading={isLoading}
        error={error}
        changeAuthMethodPath={changeAuthMethodPath}
      />
    </RouterWrapper>
  );
};

describe("AuthForm component", () => {
  authMethods.forEach((method) => {
    it(`should renders the component correctly for ${method.initialTitle}`, () => {
      render(
        <MockedComponent
          title={method.initialTitle}
          isLoading={false}
          error={undefined}
          changeAuthMethodPath={method.changePath}
        />
      );

      const title = screen.getByRole("heading", { name: method.initialTitle });
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const pwdInput = screen.getByPlaceholderText(/password/i);
      const submitBtn = screen.getByRole("button", {
        name: method.initialTitle,
      });
      const changeAuthMethodBtn = screen.getByRole("button", {
        name: method.reverseTitle,
      });

      expect(title).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(pwdInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
      expect(changeAuthMethodBtn).toBeInTheDocument();
    });
  });

  it("should renders 2 error messages if the user submits the form with empty fields", async () => {
    render(
      <MockedComponent
        title="Login"
        isLoading={false}
        error={undefined}
        changeAuthMethodPath="/register"
      />
    );

    const submitBtn = screen.getByRole("button", {
      name: /login/i,
    });

    fireEvent.click(submitBtn);

    const requiredErrMsg = await screen.findAllByText(/required/i);

    expect(requiredErrMsg).toHaveLength(2);
  });

  it("should renders 2 error messages if the user submits the form with bad information", async () => {
    render(
      <MockedComponent
        title="Login"
        isLoading={false}
        error={undefined}
        changeAuthMethodPath="/register"
      />
    );

    const emailInput = screen.getByPlaceholderText(/email address/i);
    const pwdInput = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole("button", {
      name: /login/i,
    });

    fireEvent.change(emailInput, { target: { value: MOCKED_INVALID_EMAIL } });
    fireEvent.change(pwdInput, { target: { value: MOCKED_INVALID_PWD } });
    fireEvent.click(submitBtn);

    const invalidEmailErrMsg = await screen.findByText(
      /this email address is invalid/i
    );
    const invalidPwdErrMsg = await screen.findByText(
      /password must be at least 5 characters/i
    );

    expect(invalidEmailErrMsg).toBeInTheDocument();
    expect(invalidPwdErrMsg).toBeInTheDocument();
  });

  it("should calls mutate function if the user fills in the form with good information and clicks on Login button", async () => {
    render(
      <MockedComponent
        title="Login"
        isLoading={false}
        error={undefined}
        changeAuthMethodPath="/register"
      />
    );

    const emailInput = screen.getByPlaceholderText(/email address/i);
    const pwdInput = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole("button", {
      name: /login/i,
    });

    fireEvent.change(emailInput, { target: { value: MOCKED_EMAIL } });
    fireEvent.change(pwdInput, { target: { value: MOCKED_PWD } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockedMutate).toHaveBeenCalledTimes(1);
    });
  });

  it("should redirects the user to '/register' if he clicks on Register button", () => {
    render(
      <MockedComponent
        title="Login"
        isLoading={false}
        error={undefined}
        changeAuthMethodPath="/register"
      />
    );

    const registerBtn = screen.getByRole("button", { name: /register/i });

    fireEvent.click(registerBtn);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/register");
  });

  it("should renders an error message if there is an error during the auth proccess", () => {
    render(
      <MockedComponent
        title="Login"
        isLoading={false}
        error="Error message"
        changeAuthMethodPath="/register"
      />
    );

    const errorMessage = screen.getByText(/error message/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("should renders a loading icon during the login proccess", () => {
    render(
      <MockedComponent
        title="Login"
        isLoading={true}
        error={undefined}
        changeAuthMethodPath="/register"
      />
    );

    const loadingIcon = screen.getByRole("loader");

    expect(loadingIcon).toBeInTheDocument();
  });
});
