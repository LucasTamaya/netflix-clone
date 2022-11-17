import { fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";

import ProfileScreen from "~src/screens/ProfileScreen";
import { renderWithClient } from "~tests/config/mswUtils";
import { server } from "~tests/config/server";

describe("Profile Screen", () => {
  it("should renders user data if there is no error during the request", async () => {
    renderWithClient(<ProfileScreen />);

    const title = await screen.findByRole("heading", { name: /edit profile/i });
    const profileIcon = await screen.findByAltText(/profile icon/i);
    const userEmail = await screen.findByText(/john.doe@gmail.com/i);
    const userPlan = await screen.findByRole("heading", {
      name: "Plans (Current Plan: Basic)",
    });
    const currentPlanBtn = await screen.findByRole("button", {
      name: /current package/i,
    });
    const subscribePlanBtns = await screen.findAllByRole("button", {
      name: /subscribe/i,
    });
    const logoutBtn = await screen.findByRole("button", { name: /logout/i });

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(userPlan).toBeInTheDocument();
    expect(currentPlanBtn).toBeInTheDocument();
    expect(subscribePlanBtns).toHaveLength(2);
    expect(logoutBtn).toBeInTheDocument();
  });

  it("should renders an error message if the user is not auth", async () => {
    server.use(
      rest.get("*/user/profile", (_, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    renderWithClient(<ProfileScreen />);

    const title = await screen.findByRole("heading", {
      name: /unauthorized access/i,
    });
    const errMsg = await screen.findByRole("heading", {
      name: /you are going to be redirected/i,
    });

    expect(title).toBeInTheDocument();
    expect(errMsg).toBeInTheDocument();
  });

  it("should renders an error message if there is an error during the request", async () => {
    server.use(
      rest.get("*/user/profile", (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithClient(<ProfileScreen />);

    const title = await screen.findByRole("heading", {
      name: /oops, something went wrong.../i,
    });
    const errMsg = await screen.findByRole("heading", {
      name: /try to reload the page/i,
    });

    expect(title).toBeInTheDocument();
    expect(errMsg).toBeInTheDocument();
  });

  it("should opens the logoutModal if the user clicks on the logout button", async () => {
    renderWithClient(<ProfileScreen />);

    const logoutBtn = await screen.findByRole("button", { name: /logout/i });

    fireEvent.click(logoutBtn);

    const logoutTitle = screen.getByRole("heading", {
      name: /are you sure you want to logout?/i,
    });

    expect(logoutTitle).toBeInTheDocument();
  });
});
