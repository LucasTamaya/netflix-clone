import { fireEvent, render, screen } from "@testing-library/react";

import { AuthForm } from "@components/common/AuthForm";
import { RouterWrapper } from "@mocks/RouterWrapper";
import { authMethods } from "@mocks/authMethods";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
}));

const mockedUseNavigate = jest.fn();
const mockedHandleAuth = jest.fn();

interface Props {
  title: "Login" | "Register";
  isLoading: boolean;
  error: string | undefined;
  changeAuthMethodPath: "/login" | "/register";
}

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
        email="john.doe@orange.fr"
        setEmail={jest.fn()}
        password="123456"
        setPassword={jest.fn()}
        handleAuth={mockedHandleAuth}
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

  it("should calls handleAuth function if the user clicks on Login button", () => {
    render(
      <MockedComponent
        title="Login"
        isLoading={false}
        error={undefined}
        changeAuthMethodPath="/register"
      />
    );

    const loginBtn = screen.getByRole("button", { name: /login/i });

    fireEvent.click(loginBtn);

    expect(mockedHandleAuth).toHaveBeenCalledTimes(1);
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

  it("should renders an error message if there is an error during the login proccess", () => {
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
