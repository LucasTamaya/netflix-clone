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
