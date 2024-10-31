import axios from "axios";
import {
  ICharacterResponse,
  IStarshipResponse,
  IStarship,
  IFilm,
} from "../interfaces"; // Importing necessary interfaces

const BASE_URL = "https://sw-api.starnavi.io"; // Base URL for the API

// Fetch a paginated list of characters
export const fetchCharacters = async (
  page: number
): Promise<ICharacterResponse | null> => {
  try {
    // Send GET request to the characters endpoint with pagination
    const response = await axios.get<ICharacterResponse>(
      `${BASE_URL}/people/?page=${page}`
    );
    return response.data; // Return the response data
  } catch (error) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      console.error("API error:", error.message);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    return null; // Return null in case of error
  }
};

// Fetch a list of all films
export const fetchFilms = async (): Promise<{ results: IFilm[] } | null> => {
  try {
    // Send GET request to the films endpoint
    const response = await axios.get<{ results: IFilm[] }>(
      `${BASE_URL}/films/`
    );
    return response.data; // Return the response data
  } catch (error) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      console.error("API error:", error.message);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    return null; // Return null in case of error
  }
};

// Fetch a paginated list of starships
export const fetchStarships = async (
  page: number
): Promise<IStarshipResponse | null> => {
  try {
    // Send GET request to the starships endpoint with pagination
    const response = await axios.get<IStarshipResponse>(
      `${BASE_URL}/starships/?page=${page}`
    );
    return response.data; // Return the response data
  } catch (error) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      console.error("API error:", error.message);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    return null; // Return null in case of error
  }
};

// Fetch all starships by iterating through all pages
export const fetchAllStarships = async (): Promise<IStarship[]> => {
  let allStarships: IStarship[] = []; // Array to hold all starships
  let currentPage = 1;

  try {
    // Loop through pages until no more pages are available
    while (true) {
      const response = await fetchStarships(currentPage); // Fetch starships for the current page

      if (!response) break; // Break if response is null

      allStarships = [...allStarships, ...response.results]; // Append results to allStarships array

      if (!response.next) break; // Exit loop if there are no more pages

      currentPage++; // Increment page number to fetch the next page
    }

    return allStarships; // Return the complete array of starships
  } catch (error) {
    console.error("Error fetching all starships:", error);
    return []; // Return an empty array if there's an error
  }
};
