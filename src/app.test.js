import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Add this import
import Test1 from "./Test1"; // Import the new component
import React from "react";

test("renders Test1 and checks button click", async () => {
  // Render the Test1 component
  render(<Test1 />);

  // Check if the initial message is rendered
  const initialMessage = screen.getByText(/Hello, world!/);
  expect(initialMessage).toBeInTheDocument(); // This should now work

  // Find the button and click it
  const button = screen.getByText(/Click Me/);
  fireEvent.click(button);

  // Check if the message changes after the button click
  const updatedMessage = screen.getByText(/You clicked the button!/);
  expect(updatedMessage).toBeInTheDocument(); // This should now work
});
