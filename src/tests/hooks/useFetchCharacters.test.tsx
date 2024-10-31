import { render, waitFor } from "@testing-library/react";
import { useFetchCharacters } from "../../hooks/useFetchCharacters";
import * as api from "../../api/api"; // Import all functions from api
import { act } from "react-dom/test-utils";

// Partially mock fetchCharacters, keeping other functions from ../api/api intact
jest.spyOn(api, "fetchCharacters").mockImplementation();

// Helper component to render the hook
const HookWrapper = ({ hook }: { hook: () => any }) => {
  const hookData = hook();
  return <div>{JSON.stringify(hookData)}</div>;
};

describe("useFetchCharacters", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should return initial values", async () => {
    const { findByText } = render(<HookWrapper hook={useFetchCharacters} />);
    const result = JSON.parse(
      (await findByText(/"characters":\[\]/)).textContent || "{}"
    );

    expect(result.characters).toEqual([]);
    expect(result.loading).toBe(true);
    expect(result.error).toBe(null);
  });
});
