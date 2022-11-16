import { screen } from "@testing-library/react";
import { rest } from "msw";

import { Banner } from "~src/components/Banner/Banner";
import { renderWithClient } from "~tests/config/mswUtils";
import { server } from "~tests/config/server";

describe("Banner Component", () => {
  it("should renders a banner with movie data if there is no error during the request", async () => {
    renderWithClient(<Banner />);

    const bannerBg = await screen.findByRole("banner");
    const bannerTitle = await screen.findByRole("heading", {
      name: /spiderman/i,
    });
    const bannerOverview = await screen.findByText(/spiderman, the comeback!/i);

    expect(bannerBg).toBeInTheDocument();
    expect(bannerTitle).toBeInTheDocument();
    expect(bannerOverview).toBeInTheDocument();
  });

  it("should renders an error message if there is an error during the request", async () => {
    server.use(
      rest.get("*/trending*", (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithClient(<Banner />);

    const errMsg = await screen.findByRole("heading", {
      name: /oops, something went wrong on the server.../i,
    });

    expect(errMsg).toBeInTheDocument();
  });
});
