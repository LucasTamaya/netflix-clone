import "@testing-library/jest-dom/extend-expect";

import { server } from "./config/server";
import { mockedUseNavigate } from "./mocks/useNavigate";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
}));

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
