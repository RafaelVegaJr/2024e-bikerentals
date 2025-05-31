// src/components/Login.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import axiosConfig from "../axiosConfig";

// ✅ Turn axiosConfig.post into a Jest mock manually
jest.mock("../axiosConfig");

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

test("submits login form and redirects on success", async () => {
  // ✅ Manually set the mock implementation here
  axiosConfig.post.mockResolvedValue({
    data: { token: "mocked-jwt-token" },
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/your email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/your password/i), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /log in/i }));

  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith("/profile");
  });
});
