import { render, screen, fireEvent } from "@testing-library/react";

import { NetflixPlan } from "~src/components/Other/NetflixPlan";

const mockedSubscribe = jest.fn();

describe("NetflixPlan Component", () => {
  it("should renders the component correctly", () => {
    render(
      <NetflixPlan
        title="Netflix Basic"
        price={9.99}
        resolution="720p"
        buttonTitle="Subscribe"
        canSubscribeToPlan={true}
        subscribe={mockedSubscribe}
      />
    );

    const title = screen.getByRole("heading", {
      name: "Netflix Basic - $9.99",
    });
    const resolution = screen.getByText(/720p/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    expect(title).toBeInTheDocument();
    expect(resolution).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should calls the subscribe function if canSubscribeToPlan is true and the user clicks on the button", () => {
    render(
      <NetflixPlan
        title="Netflix Basic"
        price={9.99}
        resolution="720p"
        buttonTitle="Subscribe"
        canSubscribeToPlan={true}
        subscribe={mockedSubscribe}
      />
    );

    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.click(button);

    expect(mockedSubscribe).toHaveBeenCalledTimes(1);
  });

  it("should not calls the subscribe function if canSubscribeToPlan is false and the user clicks on the button", () => {
    render(
      <NetflixPlan
        title="Netflix Basic"
        price={9.99}
        resolution="720p"
        buttonTitle="Subscribe"
        canSubscribeToPlan={false}
        subscribe={mockedSubscribe}
      />
    );

    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.click(button);

    expect(mockedSubscribe).toHaveBeenCalledTimes(0);
  });
});
