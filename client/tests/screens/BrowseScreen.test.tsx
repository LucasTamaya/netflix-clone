import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";

import BrowseScreen from "~src/screens/BrowseScreen";
import { RouterWrapper } from "~tests/mocks/RouterWrapper";
import { renderWithClient } from "~tests/config/mswUtils";
import { server } from "~tests/config/server";
import { mockedUseNavigate } from "../mocks/useNavigate";

jest.spyOn(Storage.prototype, "clear");

jest.spyOn(global, "setTimeout");

// used to mock setTimeOut fn
jest.useFakeTimers();

const MockedComponent = () => {
  return (
    <RouterWrapper>
      <BrowseScreen />
    </RouterWrapper>
  );
};

describe("Browse Screen", () => {
  it("should renders the Nav + BannerLoading + 8 MoviesRowsLoading if the user is auth", async () => {
    renderWithClient(<MockedComponent />);

    const nav = await screen.findByRole("navigation");
    const bannerLoading = await screen.findByRole("bannerLoading");
    const moviesRowsLoading = await screen.findAllByRole("movieRowLoading");

    expect(nav).toBeInTheDocument();
    expect(bannerLoading).toBeInTheDocument();
    expect(moviesRowsLoading).toHaveLength(8);
  });

  it("should renders an error message if the user is not auth", async () => {
    // simulate an 401 error response from the API
    server.use(
      rest.get("*/auth/valid*", (_, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    renderWithClient(<MockedComponent />);

    const title = await screen.findByRole("heading", {
      name: /unauthorized access/i,
    });
    const subtitle = await screen.findByRole("heading", {
      name: /you are going to be redirected/i,
    });

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("should redirects the user to '/' after 3s if he is not auth", async () => {
    server.use(
      rest.get("*/auth/valid*", (_, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    renderWithClient(<MockedComponent />);

    await screen.findByRole("heading", {
      name: /unauthorized access/i,
    });

    // run the setTimeOut fn inside the useEffect
    jest.runAllTimers();

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });

  it("should clears user's localStorage if the user is not auth", async () => {
    server.use(
      rest.get("*/auth/valid*", (_, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    renderWithClient(<MockedComponent />);

    await waitFor(() => {
      expect(localStorage.clear).toHaveBeenCalledTimes(1);
    });
  });
});
