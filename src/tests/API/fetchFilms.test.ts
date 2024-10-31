import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchFilms } from "../../api/api"; // Import fetchFilms function from the API module
import { IFilm } from "../../interfaces"; // Import the film interface

// Initialize the mock adapter for axios
const mock = new MockAdapter(axios);

describe("fetchFilms", () => {
  // Reset the mock after each test case
  afterEach(() => {
    mock.reset();
  });

  // Test case: should return film data on a successful request
  it("should return film data on successful request", async () => {
    // Mock data representing a successful response with film details
    const mockData = {
      results: [{ title: "A New Hope", episode_id: 4 } as IFilm], // Film details
    };

    // Set up the mock response for a successful API call
    mock.onGet("https://sw-api.starnavi.io/films/").reply(200, mockData);

    // Call the function and check that the result matches the mock data
    const result = await fetchFilms();
    expect(result).toEqual(mockData);
  });

  // Test case: should return null on request error
  it("should return null on request error", async () => {
    // Set up mock response to simulate a server error
    mock.onGet("https://sw-api.starnavi.io/films/").reply(500);

    // Call the function and expect null due to the request error
    const result = await fetchFilms();
    expect(result).toBeNull();
  });

  // Test case: should return an empty results array when no films are found
  it("should return an empty results array when no films are found", async () => {
    // Mock data representing an empty array of films
    const mockData = {
      results: [], // No films found
    };

    // Set up the mock response with no films in the results
    mock.onGet("https://sw-api.starnavi.io/films/").reply(200, mockData);

    // Call the function and expect the empty results array from the mock data
    const result = await fetchFilms();
    expect(result).toEqual(mockData);
  });

  // Test case: should handle network errors gracefully
  it("should handle network errors gracefully", async () => {
    // Set up mock response to simulate a network error
    mock.onGet("https://sw-api.starnavi.io/films/").networkError();

    // Call the function and expect null due to the network error
    const result = await fetchFilms();
    expect(result).toBeNull();
  });
});
