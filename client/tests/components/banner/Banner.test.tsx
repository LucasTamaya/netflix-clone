import { screen } from "@testing-library/react";
import { rest } from "msw";

import { Banner } from "~src/components/banner/Banner";
import { renderWithClient } from "~tests/config/mswUtils";
import { server } from "~tests/config/server";

describe("Banner Component", () => {
  // TO UPDATE
  //   it("should renders a banner with movie data if there is no error during the request", async () => {
  //     renderWithClient(<Banner />);

  //     const title = await screen.findByRole("heading", { name: /spiderman/i });

  //     expect(title).toBeInTheDocument();
  //   });

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
