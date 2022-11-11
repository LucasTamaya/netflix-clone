import { render, screen } from "@testing-library/react";

import { SelectPlansScreen } from "~src/screens/SelectPlansScreen";

describe("SelectPlans Screen", () => {
  it("should renders the screen correctly", () => {
    render(<SelectPlansScreen />);

    const title = screen.getByRole("heading", { name: /select a plan/i });

    expect(title).toBeInTheDocument();
  });
});
