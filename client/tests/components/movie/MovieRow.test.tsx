import { screen } from "@testing-library/react";
import { rest } from "msw";
import { moviesRequests } from "~src/assets/moviesRequests";

import { MovieRow } from "~src/components/movie/MovieRow";
import { server } from "~tests/config/server";
import { renderWithClient } from "~tests/config/mswUtils";

// top rated url
const url = moviesRequests[2].url;

describe("MovieRow Component", () => {
  it("should renders a title when the component mount", () => {
    renderWithClient(<MovieRow category="Top Rated" url={url} />);

    const title = screen.getByRole("heading", { name: /top rated/i });

    expect(title).toBeInTheDocument();
  });

  it("should renders 3 movie posters if there is no error during the request", async () => {
    renderWithClient(<MovieRow category="Top Rated" url={url} />);

    const moviePosters = await screen.findAllByRole("img");

    expect(moviePosters).toHaveLength(3);
  });

  it("should renders an error message if there is an error during the request", async () => {
    server.use(
      rest.get("*/top_rated*", (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithClient(<MovieRow category="Top Rated" url={url} />);

    const errMsg = await screen.findByRole("heading", {
      name: /oops, something went wrong on the server.../i,
    });

    expect(errMsg).toBeInTheDocument();
  });
});
