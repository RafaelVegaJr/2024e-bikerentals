import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

test("renders company section in footer", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  // Check for company heading
  expect(screen.getByText(/company/i)).toBeInTheDocument();

  // Check for a known footer link
  expect(screen.getByText(/how it works/i)).toBeInTheDocument();

  // Check for copyright
  expect(
    screen.getByText(/© 2025 electrikcruise rentals/i)
  ).toBeInTheDocument();
});
