import { render } from "@testing-library/react";
// Mock Service Worker => mock api requests

import { rest } from "msw";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const handlers = [
  rest.post("*/login", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ isSucces: true }));
  }),
  // rest.post("*/cart/add*", (_, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       error: false,
  //       message: "Product correctly added to cart",
  //       userId: "gae54tyje3748vidj",
  //     })
  //   );
  // }),
  // rest.post("*/cart/delete*", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       error: false,
  //       message: "Product correctly deleted",
  //       userId: "gae54tyje3748vidj",
  //     })
  //   );
  // }),
  // rest.post("*/checkout*", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       url: "https://stripe-checkout-test.com",
  //     })
  //   );
  // }),
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
