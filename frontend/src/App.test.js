import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders homepage title", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const title = screen.getByText(/Recent phone spec posts/i);
  expect(title).toBeInTheDocument();
});
