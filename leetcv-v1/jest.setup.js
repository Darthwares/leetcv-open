import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";

jest.mock("next-intl", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  useTranslations: (_common) => {
    return (str) => {
      return str;
    };
  },
}));

jest.mock("@nem035/gpt-3-encoder", () => {
  return jest.fn().mockImplementation(() => {
    return { encode: jest.fn() };
  });
});
jest.mock("react-circular-progressbar", () => {
  return jest.fn().mockImplementation(() => {
    return { encode: jest.fn() };
  });
});

global.ResizeObserver = require("resize-observer-polyfill");
global.TextEncoder = require("util").TextEncoder;

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("react-query", () => ({
  __esModule: true,
  useMutation: jest.fn(),
}));
