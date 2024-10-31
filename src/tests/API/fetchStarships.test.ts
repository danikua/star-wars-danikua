import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchStarships } from "../../api/api"; // Import fetchStarships function from the API module
import { IStarshipResponse } from "../../interfaces"; // Import the starship response interface

// Initialize the mock adapter for axios
const mock = new MockAdapter(axios);

describe("fetchStarships", () => {
  // Reset the mock after each test case to ensure no data persists between tests
  afterEach(() => {
    mock.reset();
  });

  // Test case: should return starship data on a successful request
  it("should return starship data on successful request", async () => {
    // Mock data representing a successful response with starship details
    const mockData: IStarshipResponse = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: "Millennium Falcon", model: "YT-1300" }],
    };

    // Set up the mock response for a successful API call to the first page
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=1")
      .reply(200, mockData);

    // Call the function and check that the result matches the mock data
    const result = await fetchStarships(1);
    expect(result).toEqual(mockData);
  });

  // Test case: should return null if the request results in an error
  it("should return null on request error", async () => {
    // Set up mock response to simulate a server error
    mock.onGet("https://sw-api.starnavi.io/starships/?page=1").reply(500);

    // Call the function and expect null due to the error
    const result = await fetchStarships(1);
    expect(result).toBeNull();
  });

  // Test case: should handle pagination correctly
  it("should handle pagination correctly", async () => {
    // Mock data for the first page with a link to the next page
    const mockPage1: IStarshipResponse = {
      count: 2,
      next: "https://sw-api.starnavi.io/starships/?page=2",
      previous: null,
      results: [{ name: "Millennium Falcon", model: "YT-1300" }],
    };
    // Mock data for the second page with no further pages
    const mockPage2: IStarshipResponse = {
      count: 2,
      next: null,
      previous: "https://sw-api.starnavi.io/starships/?page=1",
      results: [{ name: "X-Wing", model: "T-65 X-wing starfighter" }],
    };

    // Set up mock responses for pages 1 and 2
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=1")
      .reply(200, mockPage1);
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=2")
      .reply(200, mockPage2);

    // Call the function for page 1 and check that the result matches mockPage1
    const resultPage1 = await fetchStarships(1);
    expect(resultPage1).toEqual(mockPage1);

    // Call the function for page 2 and check that the result matches mockPage2
    const resultPage2 = await fetchStarships(2);
    expect(resultPage2).toEqual(mockPage2);
  });

  // Test case: should return an empty results array when no starships are found
  it("should return an empty results array when no starships are found", async () => {
    // Mock data representing an empty response with no starships
    const mockData: IStarshipResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    // Set up the mock response with no starships in the results
    mock
      .onGet("https://sw-api.starnavi.io/starships/?page=1")
      .reply(200, mockData);

    // Call the function and expect the empty results array from the mock data
    const result = await fetchStarships(1);
    expect(result).toEqual(mockData);
  });

  // Test case: should handle network errors gracefully
  it("should handle network errors gracefully", async () => {
    // Set up mock response to simulate a network error
    mock.onGet("https://sw-api.starnavi.io/starships/?page=1").networkError();

    // Call the function and expect null due to the network error
    const result = await fetchStarships(1);
    expect(result).toBeNull();
  });
});
