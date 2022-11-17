import { render, screen } from "@testing-library/react";

import { BannerFilter } from "~src/components/Banner/BannerFilter";

describe("BannerFilter Component", () => {
  it("should renders the component correctly", () => {
    render(<BannerFilter />);

    const filter = screen.getByTestId("filter");

    expect(filter).toBeInTheDocument();
  });
});
