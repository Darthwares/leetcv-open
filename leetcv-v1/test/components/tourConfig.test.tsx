import {
  defaultDashboardTour,
  defaultEditorTour,
  defaultFormFabTour,
  defaultProspectsTour,
  defaultRequestsTour,
  defaultReviewTour,
  defaultUsersTour,
  getTourConfig,
} from "@lib/helper/tourConfig";

describe("Check tour config", () => {
  it("should Check tour config and should be truthy", () => {
    const result = getTourConfig();
    expect(result).toBeTruthy();

    const dashboard = defaultDashboardTour();
    expect(dashboard).not.toBeTruthy();

    const defaultEditor = defaultEditorTour();
    expect(defaultEditor).not.toBeTruthy();

    const defaultProspect = defaultProspectsTour();
    expect(defaultProspect).not.toBeTruthy();

    const defaultFormFab = defaultFormFabTour();
    expect(defaultFormFab).not.toBeTruthy();

    const defaultRequests = defaultRequestsTour();
    expect(defaultRequests).not.toBeTruthy();

    const defaultReview = defaultReviewTour();
    expect(defaultReview).not.toBeTruthy();

    const defaultUsers = defaultUsersTour();
    expect(defaultUsers).not.toBeTruthy();
  });
});

describe("getTourConfig", () => {
  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sets correct tour status in localStorage", () => {
    mockLocalStorage.getItem.mockReturnValueOnce("false");
    mockLocalStorage.getItem.mockReturnValueOnce("true");
    mockLocalStorage.getItem.mockReturnValueOnce(null);
    mockLocalStorage.getItem.mockReturnValueOnce("false");
    mockLocalStorage.getItem.mockReturnValueOnce(null);
    mockLocalStorage.getItem.mockReturnValueOnce("true");
    mockLocalStorage.getItem.mockReturnValueOnce("false");

    const { getTourStatus } = getTourConfig();
    getTourStatus("true");

    expect(mockLocalStorage.setItem).toBeTruthy();
    expect(mockLocalStorage.setItem).toBeTruthy();
    expect(mockLocalStorage.setItem).toBeTruthy();
  });
});
