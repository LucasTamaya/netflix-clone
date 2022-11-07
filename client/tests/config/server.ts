import { setupServer } from "msw/node";

import { handlers } from "./mswUtils";

export const server = setupServer(...handlers);
