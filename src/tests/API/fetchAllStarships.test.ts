import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchAllStarships } from "../../api/api";
import { IStarship } from "../../interfaces";

// Initialize the mock adapter for axios
const mock = new MockAdapter(axios);

describe("fetchAllStarships", () => {
  // Reset mock after each test case
  afterEach(() => {
    mock.reset();
  });

  // Test case: should return all starships when requests are successful
  it("should return all starships if requests are successful", async () => {
    // Mock data for the first page
    const mockPage1 = {
      results: [{ name: "Starship One" }] as IStarship[],
      next: "https://sw-api.starnavi.io/starships/?page=2",
    };
    // Mock data for the second page
    const mockPage2 = {
      results: [{ name: "Starship Two" }] as IStarship[],
      next: null,
    };

    // Set up mock responses for each page
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=1")
      .reply(200, mockPage1);
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=2")
      .reply(200, mockPage2);

    // Call the function and expect the results to match the mock data
    const result = await fetchAllStarships();
    expect(result).toEqual([...mockPage1.results, ...mockPage2.results]);
  });

  // Test case: should return an empty array if the request fails
  it("should return an empty array when the request fails", async () => {
    // Set up mock response to fail on the first page request
    mock.onGet("https://sw-api.starnavi.io/starships/?page=1").reply(500);

    // Call the function and expect an empty array due to failure
    const result = await fetchAllStarships();
    expect(result).toEqual([]);
  });

  // Test case: handles pagination correctly when multiple pages are available
  it("should handle pagination correctly when multiple pages are available", async () => {
    // Mock data for pages with multiple starships
    const mockPage1 = {
      results: [
        { name: "Starship One" },
        { name: "Starship Two" },
      ] as IStarship[],
      next: "https://sw-api.starnavi.io/starships/?page=2",
    };
    const mockPage2 = {
      results: [{ name: "Starship Three" }] as IStarship[],
      next: null,
    };

    // Set up mock responses for multiple pages
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=1")
      .reply(200, mockPage1);
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=2")
      .reply(200, mockPage2);

    // Call the function and check that all starships are returned
    const result = await fetchAllStarships();
    expect(result).toEqual([...mockPage1.results, ...mockPage2.results]);
  });

  // Test case: should return an empty array if no starships are found
  it("should return an empty array if no starships are found", async () => {
    // Mock data with no starships found
    const mockPage1 = {
      results: [] as IStarship[],
      next: null,
    };

    // Set up mock response to return no starships
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=1")
      .reply(200, mockPage1);

    // Call the function and expect an empty array
    const result = await fetchAllStarships();
    expect(result).toEqual([]);
  });

  // Test case: should stop fetching when no more pages are available
  it("should stop fetching when no more pages are available", async () => {
    // Mock data for a single page with no additional pages
    const mockPage1 = {
      results: [{ name: "Starship One" }] as IStarship[],
      next: null,
    };

    // Set up mock response for a single page with no next page
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=1")
      .reply(200, mockPage1);

    // Call the function and expect only one page of results
    const result = await fetchAllStarships();
    expect(result).toEqual(mockPage1.results);
  });

  // Test case: should handle a network error gracefully
  it("should handle a network error gracefully", async () => {
    // Set up mock response to simulate a network error
    mock.onGet("https://sw-api.starnavi.io/starships/?page=1").networkError();

    // Call the function and expect an empty array due to network error
    const result = await fetchAllStarships();
    expect(result).toEqual([]);
  });
});
