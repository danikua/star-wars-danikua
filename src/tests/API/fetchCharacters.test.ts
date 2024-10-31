import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchCharacters } from "../../api/api"; // Import fetchCharacters function from the API module
import { ICharacterResponse } from "../../interfaces"; // Import character response interface

// Initialize the mock adapter for axios
const mock = new MockAdapter(axios);

describe("fetchCharacters", () => {
  // Reset the mock after each test case
  afterEach(() => {
    mock.reset();
  });

  // Test case: should return data on successful request
  it("should return data on successful request", async () => {
    // Mock data to be returned on success
    const mockData: ICharacterResponse = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: "Luke Skywalker", height: "172" }], // Character data structure
    };

    // Set up mock response for the first page
    mock
      .onGet("https://sw-api.starnavi.io/people/?page=1")
      .reply(200, mockData);

    // Call the function and expect the mock data as the result
    const result = await fetchCharacters(1);
    expect(result).toEqual(mockData);
  });

  // Test case: should return null on request error
  it("should return null on request error", async () => {
    // Set up mock response to simulate a server error
    mock.onGet("https://sw-api.starnavi.io/people/?page=1").reply(500);

    // Call the function and expect null due to error
    const result = await fetchCharacters(1);
    expect(result).toBeNull();
  });

  // Test case: should handle pagination correctly
  it("should handle pagination correctly", async () => {
    // Mock data for the first page with a link to the next page
    const mockPage1: ICharacterResponse = {
      count: 2,
      next: "https://sw-api.starnavi.io/people/?page=2",
      previous: null,
      results: [{ name: "Luke Skywalker", height: "172" }],
    };
    // Mock data for the second page with no next page
    const mockPage2: ICharacterResponse = {
      count: 2,
      next: null,
      previous: "https://sw-api.starnavi.io/people/?page=1",
      results: [{ name: "Darth Vader", height: "202" }],
    };

    // Set up mock responses for pages 1 and 2
    mock
      .onGet("https://sw-api.starnavi.io/people/?page=1")
      .reply(200, mockPage1);
    mock
      .onGet("https://sw-api.starnavi.io/people/?page=2")
      .reply(200, mockPage2);

    // Call the function for page 1 and check that the result matches mock data
    const resultPage1 = await fetchCharacters(1);
    expect(resultPage1).toEqual(mockPage1);

    // Call the function for page 2 and check that the result matches mock data
    const resultPage2 = await fetchCharacters(2);
    expect(resultPage2).toEqual(mockPage2);
  });

  // Test case: should return an empty results array when no characters are found
  it("should return an empty results array when no characters are found", async () => {
    // Mock data for an empty results array
    const mockData: ICharacterResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    // Set up mock response for the first page with no characters
    mock
      .onGet("https://sw-api.starnavi.io/people/?page=1")
      .reply(200, mockData);

    // Call the function and expect the mock data (empty results array)
    const result = await fetchCharacters(1);
    expect(result).toEqual(mockData);
  });

  // Test case: should handle network errors gracefully
  it("should handle network errors gracefully", async () => {
    // Set up mock response to simulate a network error
    mock.onGet("https://sw-api.starnavi.io/people/?page=1").networkError();

    // Call the function and expect null due to network error
    const result = await fetchCharacters(1);
    expect(result).toBeNull();
  });
});
