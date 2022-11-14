import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";

import { renderWithClient } from "~tests/config/mswUtils";
import { CheckoutSuccessScreen } from "~src/screens/CheckoutSuccessScreen";
import { server } from "~tests/config/server";
import { mockedUseNavigate } from "~tests/mocks/useNavigate";

describe("CheckoutSuccess Screen", () => {
  it("should renders the screen correctly", async () => {
    renderWithClient(<CheckoutSuccessScreen />);

    const nav = await screen.findByRole("navigation");
    const title = await screen.findByRole("heading", {
      name: /checkout success!/i,
    });
    const loader = await screen.findByTestId("loader");

    expect(nav).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });

  it("should redirects the user to '/browse' if there is no error during the request", async () => {
    server.use(
      rest.patch("*/netflix-plan", (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ isSuccess: true }));
      })
    );

    renderWithClient(<CheckoutSuccessScreen />);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  it("should renders an error message if there is an error during the request", async () => {
    server.use(
      rest.patch("*/netflix-plan", (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithClient(<CheckoutSuccessScreen />);

    const title = await screen.findByRole("heading", {
      name: /oops, something went wrong.../i,
    });
    const errMsg = await screen.findByRole("heading", {
      name: /try to reload the page/i,
    });

    expect(title).toBeInTheDocument();
    expect(errMsg).toBeInTheDocument();
  });
});
