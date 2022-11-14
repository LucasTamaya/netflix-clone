import { fireEvent, render, screen } from "@testing-library/react";

import { LogoutModal } from "~src/components/other/LogoutModal";

const mockedHandleCancel = jest.fn();
const mockedHandleLogout = jest.fn();

const MockedComponent = () => {
  return (
    <LogoutModal
      handleCancel={mockedHandleCancel}
      handleLogout={mockedHandleLogout}
    />
  );
};

describe("LogoutModal Component", () => {
  it("should renders the component correctly", () => {
    render(<MockedComponent />);

    const title = screen.getByRole("heading", {
      name: /are you sure you want to logout?/i,
    });
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    const logoutBtn = screen.getByRole("button", { name: /logout/i });

    expect(title).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it("should calls the function handleCancel with false in parameter if the user clicks on the cancel button", () => {
    render(<MockedComponent />);

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });

    fireEvent.click(cancelBtn);

    expect(mockedHandleCancel).toHaveBeenCalledTimes(1);
    expect(mockedHandleCancel).toHaveBeenCalledWith(false);
  });

  it("should calls the function handleLogout if the user clicks on the logout button", () => {
    render(<MockedComponent />);

    const logoutBtn = screen.getByRole("button", { name: /logout/i });

    fireEvent.click(logoutBtn);

    expect(mockedHandleLogout).toHaveBeenCalledTimes(1);
  });
});
