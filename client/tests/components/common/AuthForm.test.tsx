import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { AuthForm } from "~src/components/Common/AuthForm";
import { RouterWrapper } from "~tests/mocks/RouterWrapper";
import { authMethods } from "~tests/mocks/authMethods";
import { mockedUseNavigate } from "~tests/mocks/useNavigate";
import {
  MOCKED_INVALID_EMAIL,
  MOCKED_EMAIL,
  MOCKED_PWD,
  MOCKED_INVALID_PWD,
} from "~tests/mocks/data";

interface Props {
  title: "Login" | "Register";
  isLoading: boolean;
  isSuccess: boolean;
  error: string | undefined;
  successUrl: "/browse" | "/select-plans";
}

const mockedMutate = jest.fn();

const MockedComponent: React.FC<Props> = ({
  title,
  isLoading,
  isSuccess,
  error,
  successUrl,
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
        isSuccess={isSuccess}
        error={error}
        successUrl={successUrl}
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
          isSuccess={false}
          error={undefined}
          successUrl={method.successUrl}
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
        isSuccess={false}
        error={undefined}
        successUrl="/browse"
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
        isSuccess={false}
        error={undefined}
        successUrl="/browse"
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
        isSuccess={false}
        error={undefined}
        successUrl="/browse"
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

  it("should redirects the user to the successUrl if the auth proccess went good", async () => {
    render(
      <MockedComponent
        title="Login"
        isLoading={false}
        isSuccess={true}
        error={undefined}
        successUrl="/browse"
      />
    );

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/browse");
  });

  it("should redirects the user to '/register' if he clicks on Register button", () => {
    render(
      <MockedComponent
        title="Login"
        isLoading={false}
        isSuccess={false}
        error={undefined}
        successUrl="/browse"
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
        isSuccess={false}
        error="Error message"
        successUrl="/browse"
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
        isSuccess={false}
        error={undefined}
        successUrl="/browse"
      />
    );

    const loadingIcon = screen.getByRole("loader");

    expect(loadingIcon).toBeInTheDocument();
  });
});
