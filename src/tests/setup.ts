import "@testing-library/jest-dom/extend-expect";
import "jest-extended";
import axios from "axios";
import { mocked } from "ts-jest/utils";

jest.mock("axios");
mocked(axios).mockImplementation(() => ({
  get: jest.fn(),
}));
