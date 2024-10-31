import { render, waitFor } from "@testing-library/react";
import { useFetchStarships } from "../../hooks/useFetchStarships";
import * as api from "../../api/api";
import { IStarship } from "../../interfaces";
import { act } from "react-dom/test-utils";

// Mock fetchAllStarships
jest.spyOn(api, "fetchAllStarships").mockImplementation();

const HookWrapper = ({ hook }: { hook: () => any }) => {
  const hookData = hook();
  return <div>{JSON.stringify(hookData)}</div>;
};

describe("useFetchStarships", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial values", async () => {
    const { container } = render(<HookWrapper hook={useFetchStarships} />);
    const result = JSON.parse(container.textContent || "{}");

    expect(result.starships).toEqual([]);
    expect(result.loading).toBe(true);
    expect(result.error).toBe(null);
    expect(result.currentPage).toBe(1);
  });

  it("should load starships and paginate correctly", async () => {
    const mockData: IStarship[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Starship ${i + 1}`,
    }));
    (api.fetchAllStarships as jest.Mock).mockResolvedValueOnce(mockData);

    const resultRef = { current: null };
    const { container } = render(
      <HookWrapper
        hook={() => {
          resultRef.current = useFetchStarships();
          return resultRef.current;
        }}
      />
    );

    await waitFor(() => {
      const result = resultRef.current;
      expect(result?.allStarships).toEqual(mockData);
      expect(result?.loading).toBe(false);
      expect(result?.starships.length).toBe(10); // itemsPerPage
      expect(result?.totalPages).toBe(2);
    });

    // Go to the next page and check
    act(() => {
      resultRef.current?.goToPage(2);
    });

    await waitFor(() => {
      const result = resultRef.current;
      expect(result?.starships.length).toBe(5); // Remaining items
      expect(result?.currentPage).toBe(2);
    });
  });

  it("should handle errors correctly", async () => {
    (api.fetchAllStarships as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch starships")
    );

    const resultRef = { current: null };
    const { container } = render(
      <HookWrapper
        hook={() => {
          resultRef.current = useFetchStarships();
          return resultRef.current;
        }}
      />
    );

    await waitFor(() => {
      const result = resultRef.current;
      expect(result?.error).toBe("Failed to fetch starships");
      expect(result?.loading).toBe(false);
      expect(result?.starships).toEqual([]);
    });
  });
});
