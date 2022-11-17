import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import { SelectPlansScreen } from "~src/screens/SelectPlansScreen";
import { HelmetWrapper } from "~tests/mocks/HelmetWrapper";

const MockedComponent = () => {
  return (
    <HelmetWrapper>
      <SelectPlansScreen />
    </HelmetWrapper>
  );
};

describe("SelectPlans Screen", () => {
  it("should renders the screen correctly", () => {
    render(<MockedComponent />);

    const title = screen.getByRole("heading", { name: /select a plan/i });

    expect(title).toBeInTheDocument();
  });
});
