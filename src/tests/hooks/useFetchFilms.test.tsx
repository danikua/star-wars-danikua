import { render, waitFor } from "@testing-library/react";
import { useFetchFilms } from "../../hooks/useFetchFilms";
import * as api from "../../api/api";
import { IFilmResponse } from "../../interfaces";

// Mock the fetchFilms function
jest.spyOn(api, "fetchFilms").mockImplementation();

// Helper component to render the hook
const HookWrapper = ({ hook }: { hook: () => any }) => {
  const hookData = hook();
  return <div>{JSON.stringify(hookData)}</div>;
};

describe("useFetchFilms", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  it("should return initial values", async () => {
    const { container } = render(<HookWrapper hook={useFetchFilms} />);

    await waitFor(() => {
      const result = JSON.parse(container.textContent || "{}");
      expect(result.films).toEqual([]);
      expect(result.loading).toBe(true);
      expect(result.error).toBe(null);
    });
  });

  it("should load and set films data", async () => {
    const mockResponse: IFilmResponse = {
      results: [{ id: 1, title: "Film 1" }],
    };
    (api.fetchFilms as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { container } = render(<HookWrapper hook={useFetchFilms} />);

    await waitFor(() => {
      const result = JSON.parse(container.textContent || "{}");
      expect(result.films).toEqual(mockResponse.results);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(null);
    });
  });

  it("should handle fetch error", async () => {
    (api.fetchFilms as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const { container } = render(<HookWrapper hook={useFetchFilms} />);

    await waitFor(() => {
      const result = JSON.parse(container.textContent || "{}");
      expect(result.error).toBe("Failed to fetch films.");
      expect(result.loading).toBe(false);
      expect(result.films).toEqual([]);
    });
  });
});
