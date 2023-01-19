import "@testing-library/jest-dom";
import {
  render,
  RenderOptions,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { SWRConfig } from "swr";
import App from "./App";

describe("App", () => {
  describe("Note 1", () => {
    beforeEach(async () => {
      customRender(<App />);
      await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    });

    it("renders note 1", () => {
      const title = screen.getByRole("heading");
      expect(title).toHaveTextContent("sunt");
    });
  });

  describe("Note 2", () => {
    beforeEach(async () => {
      customRender(<App />);
      await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    });

    it('renders note 2"', async () => {
      const button = screen.getByRole("button", { name: "Next" });

      await userEvent.click(button);

      await waitFor(() => {
        const title = screen.getByRole("heading");
        expect(title).toHaveTextContent("qui");
      });
    });
  });

  describe("no results", () => {
    beforeEach(async () => {
      customRender(<App />);
      await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    });

    it("shows a no data message", async () => {
      const button = screen.getByRole("button", { name: "Empty" });

      await userEvent.click(button);

      await waitFor(() => {
        const message = screen.getByText("No data");
        expect(message).toBeInTheDocument();
      });
    });
  });
});

const Providers = ({ children }: { children: ReactElement }) => (
  <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
    {children}
  </SWRConfig>
);

const customRender = (
  ui: ReactElement,
  opts?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Providers, ...opts });
