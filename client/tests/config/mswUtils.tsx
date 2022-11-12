import { render } from "@testing-library/react";
// Mock Service Worker => mock api requests

import { rest } from "msw";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const fakeToken = "eag54gaeg";

export const handlers = [
  rest.post("*/auth/login", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ isSuccess: true, token: fakeToken })
    );
  }),

  rest.post("*/auth/register", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ isSuccess: true, token: fakeToken })
    );
  }),

  rest.get("*/auth/valid", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ isSuccess: true }));
  }),

  // rest.get("*/trending*", (_, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       backdrop_path: "banner-url.jpg",
  //       title: "Spiderman",
  //       overview: "Spiderman, the comeback!",
  //     })
  //   );
  // }),

  rest.get("*/top_rated?*", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          { backdrop_path: "/movie.jpg" },
          { backdrop_path: "/movie.jpg" },
          { backdrop_path: "/movie.jpg" },
        ],
      })
    );
  }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}
